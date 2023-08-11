function search_courses() {
    const year = $("#year option:selected").val();
    const semester = $("#semester option:selected").val();
    const sort = $("#sort option:selected").val();
    const college = $("#college option:selected").val();
    const depart = $("#depart option:selected").val();
    const major = $("#major option:selected").val();
    const subjectCd = $("#subject-code").val();

    const searchUrl = `${BASE_URL}/api/courses`
    const params = {  // 필요한 query params를 {} 형태에 담아준다.
        courseYear: year,
        semester: semester,
        subjectCd: subjectCd,
        collegeId: college,
        departId: depart,
        sortNm: sort,
        majorId: major
    };

    const queryString = new URLSearchParams(params).toString();
    const requrl = `${searchUrl}?${queryString}`;

    console.log(requrl);

    fetch(requrl, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
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
                            </tr>
                            `
                    $('#course-list').append(temp)
                })
            } else {
                console.log(result.errors)
                alert("조회 api 에러");
            }
        }
        )
        .catch(error => {
            console.error("조회 api 에러", error);
        });
}