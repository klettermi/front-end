function logout() {
    localStorage.removeItem("Authorization");
    // location.replace("메인페이지 주소")
}

function search_class() {
    const year = 2023;
    const semester = 1;
    const subjectCd = $("#subject-code").val();
    const depart = $("#depart option:selected").text();
    const sort = $("#sort option:selected").text();

    const searchUrl = "http://localhost:8080/api/courses"
    const params = {  // 필요한 query params를 {} 형태에 담아준다.
        year: year,
        semester: semester,
        subjectCd: subjectCd,
        depart: depart,
        sort: sort
    };

    const queryString = new URLSearchParams(params).toString();
    const requrl = `${searchUrl}?${queryString}`;

    console.log(requrl);

    fetch(requrl, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((result) => {
                if (result.success) {
                    $('#search-list').empty();

                    result.data.forEach(element => {
                        const courseId = element.courseId;
                        const collegeName = element.collegeName;
                        const departmentName = element.departmentName == null ? '-' : element.departmentName;
                        const majorName = element.majorName  == null ? '-' : element.majorName;
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
                                    <button type="button" class="btn btn-primary btn-sm" onclick="register(${courseId})">신청</button>
                                </td>
                            </tr>
                            `
                        $('#search-list').append(temp)
                    })
                } else {
                    console.log("조회 데이터 없음")
                }
            }
        )
        .catch(error => {
            console.error("조회 api 에러", error);
        });
}

function register(courseId) {
    console.log(courseId)
}