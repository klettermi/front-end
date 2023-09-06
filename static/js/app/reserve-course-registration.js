$(document).ready(function () {
    getCoursesFromBasket();
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
        case "1학기" :
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
                        alert("검색된 강의가 없습니다.")
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
                        const numberOfBasket = element.numberOfBasket;


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
                                <td>${numberOfBasket}</td>
                                <td>
                                    <button type="submit" class="btn btn-primary btn-sm" onclick="registerToBasket(${courseId})">신청</button>
                                </td>
                            </tr>
                            `
                        $('#course-list').append(temp)
                    })
                } else {
                    console.log(result.errors)
                    alert("검색된 강의가 없습니다.");
                }
            }
        )
        // .catch(error => {
        //     console.error("조회 api 에러", error);
        // }); 검색 결과의 로그가 아닌 api 통신의 오류를 유저가 볼 수 있는 로그로 찍어야 할지 고민되어 주석 처리.
}


function registerToBasket(courseId) {
    let url = `${BASE_URL}/api/basket/` + courseId;
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
                alert(result.msg);
                location.reload();
            } else {
                alert(result.errors);
            }
        });
}

function cancelFromBasket(basketId) {
    let url = `${BASE_URL}/api/basket/` + basketId;
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
                    const basketId = element.basketId;
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
                        <td>
                            <button type="button" class="btn btn-primary btn-sm" onclick="cancelFromBasket(${basketId})">취소</button>
                        </td>
                    </tr>
                    `
                    $('#basket-list').append(temp)
                })
            } else {
                alert(result.errors)
                location.replace("/index.html")
            }
        });

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