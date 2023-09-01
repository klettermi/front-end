var registeredCourses = [];

$(document).ready(function () {
    getCoursesFromBasket();
    getRegistration();
    getUserInfo();
    putInfo();
});

function logout() {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("username");
    localStorage.removeItem("usernumber");
    location.replace("/index.html")
}

function search_courses() {
    const sort = $("#sort option:selected").val();
    const college = $("#college option:selected").val();
    const depart = $("#depart option:selected").val();
    const major = $("#major option:selected").val();

    if (!college && !sort) {
        $("#text_college").css("color", "red")
        $("#text_sort").css("color", "red")
        alert("필수 입력 정보를 확인해주세요.")
        return;
    }

    $("#text_college").css("color", "black")
    $("#text_sort").css("color", "black")

    const params = {  // 필요한 query params를 {} 형태에 담아준다.
        collegeId: college,
        departId: depart,
        sortNm: sort,
        majorId: major
    };

    search_api(params)
}

function search_courses_by_subjectCd() {
    const subjectCd = $("#subject-code").val();

    if (!subjectCd) {
        alert("과목 코드를 입력해주세요.")
        return;
    }

    const params = {  // 필요한 query params를 {} 형태에 담아준다.
        subjectCd: subjectCd
    };

    search_api(params)
}

function search_api(params) {
    const year = localStorage.getItem('year');
    let semester = 0;
    switch (localStorage.getItem('semester')) {
        case "1학기":
            semester = 1;
            break;
        case "2학기":
            semester = 2;
            break;
        case "여름학기":
            semester = 3;
            break;
        case "겨울학기":
            semester = 4;
    }
    const searchUrl = `${BASE_URL}/api/courses`
    params.year = year
    params.semester = semester

    const queryString = new URLSearchParams(params).toString();
    const requrl = `${searchUrl}?${queryString}`;


    fetch(requrl, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((result) => {
            $('#course-list').empty();
            if (result.success) {
                if (result.data == "") {
                    alert("조회된 데이터가 없습니다.")
                    return;
                }
                result.data.forEach(element => {
                    const courseId = element.courseId;
                    const collegeName = element.collegeName;
                    const departmentName = element.departmentName == null ? '-' : element.departmentName;
                    const majorName = element.majorName == null ? '-' : element.majorName;
                    const sort = element.sort;
                    const subjectCd = element.subjectCd;
                    const division = element.division;
                    const subjectName = element.subjectName;
                    const credit = element.credit;
                    const professorName = element.professorName;
                    const timetable = element.timetable;
                    const limitation = element.limitation;
                    const numberOfCurrent = element.numberOfCurrent;


                    let temp = `
                            <tr>
                                <td>${collegeName}</td>
                                <td>${departmentName}</td>
                                <td>${majorName}</td>
                                <td>${sort}</td>
                                <td>${subjectCd}</td>
                                <td>${division}</td>
                                <td>${subjectName}</td>
                                <td>${credit}</td>
                                <td>${professorName}</td>
                                <td>${timetable}</td>
                                <td>${limitation}</td>
                                <td>${numberOfCurrent}</td>
                                <td>
                                    <button type="submit" class="btn btn-primary btn-sm" onclick="register(${courseId})">신청</button>
                                </td>
                            </tr>
                            `
                    $('#course-list').append(temp)
                })
            } else {
                console.log(result.errors)
                alert("조회된 데이터가 없습니다.");
            }
        }
        )
        .catch(error => {
            console.error("조회 api 에러", error);
        });
}

function register(courseId) {
    const host = BASE_URL.substr(7); // https인 경우 수정필요!
    const client = Stomp.client(`ws://${host}/ws`);
    let totalPeople;
    let currentWaitingCount;
    const username = localStorage.getItem('username');

    client.connect({}, function() { // 연결
        $('.overlay').toggle(); // 대기열 보이게
        // 수강신청 응답 구독
        client.subscribe(`/sub/result/${username}`, (message) => {
            $('.overlay').toggle(); // 대기열 숨기기
            client.disconnect(); // 연결 종료
            alert(message.body); // 응답 보여주기
        });
    
        // 수강신청 대기인원 구독
        let isFirstResponse = true;
        client.subscribe(`/sub/order/${username}`, (message) => {
            if (isFirstResponse) { // 첫 응답일때
                isFirstResponse = false;
                totalPeople = currentWaitingCount = message.body; // 전체인원 고정
            } else {
                currentWaitingCount = message.body; // 이후 대기순번만 업데이트
            }
            updateQueueInfo(totalPeople, currentWaitingCount); // 대기열 ui 업데이트
        });
    });

    let url = `${BASE_URL}/api/registration/` + courseId;
    let token = localStorage.getItem("Authorization");
    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": token
        },
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log(result.msg);
        } else {
            console.error(result.errors);
        }
    });
}

function updateQueueInfo(totalPeople, currentWaitingCount) {
    $('#waitingCount').text(currentWaitingCount);
    
    const averageTimePerPerson = 5;
    const waitingTime = currentWaitingCount * averageTimePerPerson;
    const remainCount = totalPeople - currentWaitingCount;
    const min = (waitingTime/60 < 1) ? 0 : waitingTime/60;
    const sec = waitingTime%60;
    $('#waitingTime').text(min + ' 분 ' + sec + ' 초');

    const progressPercentage = (remainCount / totalPeople) * 100;
    $('.progress-bar').css('width', progressPercentage + '%').attr('aria-valuenow', progressPercentage);
}

function cancel(registrationId) {
    let url = `${BASE_URL}/api/registration/` + registrationId;
    let token = localStorage.getItem("Authorization");
    fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": token
        },
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert(result.msg);
                location.reload();
            } else {
                alert(result.errors);
            }
        });
}

function getRegistration() {
    let url = `${BASE_URL}/api/registration`;
    let token = localStorage.getItem("Authorization");
    fetch(url, {
        method: "GET",
        headers: {
            "Authorization": token
        },
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                $('#registration-list').empty();

                result.data.forEach(element => {
                    const registrationId = element.registrationId;
                    const courseId = element.courseId;
                    const collegeName = element.collegeName;
                    const departmentName = element.departmentName == null ? '-' : element.departmentName;
                    const majorName = element.majorName == null ? '-' : element.majorName;
                    const sort = element.sort;
                    const subjectCode = element.subjectCode;
                    const division = element.division;
                    const subjectName = element.subjectName;
                    const credit = element.credit;
                    const professorName = element.professorName;
                    const timetable = element.timetable;
                    const limitation = element.limitation;
                    const current = element.current;

                    let temp = `
                    <tr>
                        <td>${collegeName}</td>
                        <td>${departmentName}</td>
                        <td>${majorName}</td>
                        <td>${sort}</td>
                        <td>${subjectCode}</td>
                        <td>${division}</td>
                        <td>${subjectName}</td>
                        <td>${credit}</td>
                        <td>${professorName}</td>
                        <td>${timetable}</td>
                        <td>${limitation}</td>
                        <td>${current}</td>
                        <td>
                            <button type="submit" class="btn btn-primary btn-sm" onclick="cancel(${registrationId})">취소</button>
                        </td>
                    </tr>
                    `
                    $('#registration-list').append(temp)
                    registeredCourses.push(courseId);
                })
            } else {
                console.log(result.errors)
            }
        });
}

function getCoursesFromBasket() {
    let url = `${BASE_URL}/api/basket`;
    let token = localStorage.getItem("Authorization");
    fetch(url, {
        method: "GET",
        headers: {
            "Authorization": token
        },
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                $('#basket-list').empty();
                result.data.forEach(element => {
                    const courseId = element.courseId;
                    const collegeName = element.collegeName;
                    const departmentName = element.departmentName == null ? '-' : element.departmentName;
                    const majorName = element.majorName == null ? '-' : element.majorName;
                    const sort = element.sort;
                    const subjectCode = element.subjectCd;
                    const division = element.division;
                    const subjectName = element.subjectName;
                    const credit = element.credit;
                    const professorName = element.professorName;
                    const timetable = element.timetable;
                    const limitation = element.limitation;
                    const numberOfBasket = element.numberOfBasket;

                    let temp = `
                    <tr>
                        <td>${collegeName}</td>
                        <td>${departmentName}</td>
                        <td>${majorName}</td>
                        <td>${sort}</td>
                        <td>${subjectCode}</td>
                        <td>${division}</td>
                        <td>${subjectName}</td>
                        <td>${credit}</td>
                        <td>${professorName}</td>
                        <td>${timetable}</td>
                        <td>${limitation}</td>
                        <td>${numberOfBasket}</td>
                    `

                    if (registeredCourses.indexOf(courseId) != -1) {
                        temp += `<td>
                                    <button type="button" class="btn btn-primary btn-sm" onclick="register(${courseId})" disabled>신청 완료</button>
                                </td>`;
                    } else {
                        temp += `<td>
                                    <button type="button" class="btn btn-primary btn-sm" onclick="register(${courseId})">신청</button>
                                </td>`;
                    }
                    temp += `</tr>`;

                    $('#basket-list').append(temp)
                })
            } else {
                alert(result.errors)
                location.replace("/index.html")
            }
        });
}

function getUserInfo() {
    let url = `${BASE_URL}/api/students/info`
    let token = localStorage.getItem("Authorization");
    fetch(url, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.success) {
                var data = result.data
                $('#student-info').empty();
                const studentNM = data.studentNM;
                const studentNum = data.studentNum;
                const possibleCredits = data.possibleCredits;
                const appliedCredits = data.appliedCredits;

                let temp = `
                        <tr>
                            <td>${studentNum}</td>
                            <td>${studentNM}</td>
                            <td>${possibleCredits}</td>
                            <td>${appliedCredits}</td>
                        </tr>
                        `
                $('#student-info').append(temp)
            } else {
                console.log(result.errors)
            }
        })
}

function putInfo() {
    const year = localStorage.getItem('year');
    const semester = localStorage.getItem('semester');
    const username = localStorage.getItem('username');
    const usernumber = localStorage.getItem('usernumber');

    $('#year').text(year);
    $('#semester').text(semester);
    $('#username').text(username);
    $('#usernumber').text(usernumber);
}