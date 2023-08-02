function logout() {
    localStorage.removeItem("Authorization");
    // location.replace("메인페이지 주소")
}

function search_class() {
    const year = 2023;
    const semester = 1;
    const departOptions = document.getElementById("depart");
    const sortOptions = document.getElementById("sort");

    const depart = departOptions.options[departOptions.selectedIndex].text;
    const sort = sortOptions.options[sortOptions.selectedIndex].text;

    const searchUrl = "http://localhost:8080/api/courses"
    const params = {  // 필요한 query params를 {} 형태에 담아준다.
        year: year,
        semester: semester,
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
        .then((result) => result.data.json())
        .then((result) => {
            result.forEach(data => {
                const 대학 = data.대학;
                const 학과 = data.학과;
                const 전공 = data.전공;
                const 이수구분 = data.이수구분;
                const 과목코드 = data.과목코드;
                const 분반 = data.분반;
                const 교과목명 = data.교과목명;
                const 학점 = data.학점;
                const 담당교수 = data.담당교수;
                const 강의시간 = data.강의시간;
                const 제한인원 = data.제한인원;
                const 현재신청인원 = data.현재신청인원;

                const searchList = document.getElementById("search-list");

                let temp = `
                <tr>
                    <td>${대학}</td>
                    <td>${학과}</td>
                    <td>${전공}</td>
                    <td>${이수구분}</td>
                    <td>${과목코드}</td>
                    <td>${분반}</td>
                    <td>${교과목명}</td>
                    <td>${학점}</td>
                    <td>${담당교수}</td>
                    <td>${강의시간}</td>
                    <td>${제한인원}</td>
                    <td>${현재신청인원}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-sm" onclick="register()">신청</button>
                    </td>
                </tr>
                `
                searchList.empty();
                searchList.append(temp)
            })

        })
        .catch(error => {
            console.error("조회 api 에러", error);
        });
}