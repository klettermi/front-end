$(document).ready(function () {
    getRegistration();
    getCoursesFromBasket();
});

function logout() {
    localStorage.removeItem("Authorization");
    // location.replace("메인페이지 주소")
}

function changeCollege(college) {
    $("#depart").empty()
    $("#major").empty()
    const map = new Map()
    switch (Number(college)) {
        case 2:
            map.set(1, '컴퓨터공학과')
            map.set(37, '전기전자공학과')
            map.set(41, '전자공학과')
            map.set(48, 'AI융합학과')
            map.set(72, '디지털밀리터리학과')
            map.set(75, 'I융합학과')
            break;
        case 3:
            map.set(2, '문화인류학과')
            map.set(7, '사회학과')
            map.set(8, '행정·심리학부')
            map.set(10, '정치외교학과')
            map.set(14, '미디어커뮤니케이션학과')
            map.set(42, '부동산학과')
            break;
        case 4:
            map.set(3, '역사교육과')
            map.set(4, '국어교육과')
            map.set(11, '윤리교육과')
            map.set(13, '한문교육과')
            map.set(15, '가정교육과')
            map.set(20, '지리교육과')
            map.set(46, '체육교육과')
            map.set(49, '교육학과')
            map.set(50, '과학교육학부')
            map.set(51, '수학교육과')
            map.set(52, '영어교육과')
            map.set(53, '일반사회교육과')
            break;
        case 5:
            map.set(5, '관광경영학과')
            map.set(16, '경영·회계학부')
            map.set(19, '경제·정보통계학부')
            map.set(36, '국제무역학과')
            break;
        case 7:
            map.set(6, '인문학부')
            break;
        case 8:
            map.set(9, '영상문화학과')
            map.set(18, '에너지자원·산업공학부')
            map.set(29, '무용학과')
            map.set(30, '스포츠과학과')
            map.set(31, '디자인학과')
            map.set(32, '음악학과')
            map.set(34, '미술학과')
            map.set(57, '건축학과(5년제)')
            map.set(58, '건축·토목·환경공학부')
            map.set(59, '배터리융합공학과')
            map.set(60, '화공·생물공학부')
            break;
        case 9:
            map.set(12, '자유전공학부')
            map.set(80, '법학부')
            break;
        case 10:    // 학과 없이 전공만 존재
            map.set(21, '지질학전공')
            makeOptions(map, "major")
            return;
        case 12:
            map.set(17, '언어연수과')
            map.set(77, '국제교류과')
            break;
        case 14:
            map.set(21, '분자생명과학과')
            map.set(39, '의생명융합학부')
            map.set(69, '생명건강공학과')
            map.set(70, '생물의소재공학과')
            break;
        case 15:
            map.set(22, '수학과')
            map.set(24, '화학·생화학부')
            map.set(25, '지질·지구물리학부')
            map.set(35, '생명과학과')
            map.set(45, '물리학과')
            break;
        case 16:
            map.set(23, '원예·농업자원경제학부')
            map.set(26, '환경융합학부')
            map.set(27, '스마트팜농산업학과')
            map.set(40, '생물자원과학부')
            map.set(62, '지역건설공학과')
            map.set(63, '바이오산업공학부')
            map.set(78, '미래농업융합학부')
            break;
        case 17:
            map.set(28, '동물응용과학과')
            map.set(44, '동물자원과학과')
            map.set(64, '동물산업융합학과')
            break;
        case 18:
            map.set(33, '의학과')
            break;
        case 19:
            map.set(38, '산림과학부')
            map.set(43, '생태조경디자인학과')
            map.set(47, '목재·종이과학부')
            break;
        case 22:
            map.set(54, '취업지원과')
            map.set(56, '학생과')
            break;
        case 23:
            map.set(55, '지역특화청년전문가양성사업단(GTEP)')
            map.set(76, '사업단')
            break;
        case 28:
            map.set(65, '수의예과')
            map.set(66, '수의학과')
            break;
        case 29:
            map.set(67, '약학과')
            break;
        case 30:
            map.set(68, '간호학과')
            break;
        case 31:
            map.set(71, '연계학과')
            map.set(74, '미래융합가상학과')
            break;
        case 32:
            map.set(33, '의학과')
            map.set(73, '의예과')
            break;
    }

    makeOptions(map, "depart");
}

function changeDepartment(depart) {
    const map = new Map()
    switch (Number(depart)) {
        case 6:
            map.set(1, '국어국문학전공')
            map.set(2, '독어독문학전공')
            map.set(4, '불어불문학전공')
            map.set(5, '일본학전공')
            map.set(6, '사학전공')
            map.set(8, '철학전공')
            map.set(10, '영어영문학전공')
            map.set(15, '중어중문학전공')
            break;
        case 8:
            map.set(3, '심리학전공')
            map.set(11, '행정학전공')
            break;
        case 12:
            map.set(7, '자유전공학부(인문계열)')
            map.set(17, '자유전공학부(자연계열)')
            break;
        case 16:
            map.set(9, '경영학전공')
            map.set(12, '회계학전공')
            break;
        case 18:
            map.set(13, '산업공학전공')
            map.set(30, '에너지자원공학전공')
            break;
        case 19:
            map.set(14, '경제학전공')
            map.set(16, '정보통계학전공')
            break;
        case 23:
            map.set(18, '원예과학전공')
            map.set(41, '농업자원경제학전공')
            break;
        case 24:
            map.set(19, '생화학전공')
            map.set(27, '화학전공')
            break;
        case 25:
            map.set(20, '지구물리학전공')
            map.set(21, '지질학전공')
            break;
        case 26:
            map.set(22, '에코환경과학전공')
            map.set(38, '바이오자원환경학전공')
            break;
        case 29:
            map.set(52, '한국무용전공')
            map.set(53, '발레전공')
            map.set(54, '현대무용전공')
            break;
        case 31:
            map.set(42, '비주얼디자인전공')
            map.set(43, '인더스트리얼디자인전공')
            map.set(44, '영상디자인전공')
            break;
        case 32:
            map.set(48, '성악전공')
            map.set(49, '피아노전공')
            map.set(50, '관현악전공')
            map.set(51, '작곡전공')
            break;
        case 34:
            map.set(45, '한국화전공')
            map.set(46, '서양화전공')
            map.set(47, '조소전공')
            break;
        case 38:
            map.set(23, '산림환경보호학전공')
            map.set(25, '산림자원학전공')
            map.set(26, '산림경영학전공')
            break;
        case 39:
            map.set(24, '의생명공학전공')
            map.set(61, '시스템면역과학전공')
            break;
        case 40:
            map.set(36, '식물자원응용과학전공')
            map.set(37, '식물의학전공')
            map.set(89, '응용생물학전공')
            break;
        case 47:
            map.set(59, '목재과학전공')
            map.set(60, '종이소재과학전공')
            break;
        case 50:
            map.set(55, '물리교육전공')
            map.set(56, '화학교육전공')
            map.set(57, '생물교육전공')
            map.set(58, '지구과학교육전공')
            break;
        case 58:
            map.set(28, '건축공학전공')
            map.set(29, '토목공학전공')
            map.set(34, '환경공학전공')
            break;
        case 60:
            map.set(31, '생물공학전공')
            map.set(33, '화학공학전공')
            break;
        case 61:
            map.set(32, '기계의용공학전공')
            map.set(35, '메카트로닉스공학전공')
            break;
        case 63:
            map.set(39, '바이오시스템기계공학전공')
            map.set(40, '식품생명공학전공')
            break;
        case 71:
            map.set(62, '소프트웨어융합연계전공')
            map.set(83, '바이오소프트웨어연계전공')
            break;
        case 74:
            map.set(63, '인문예술치료학과')
            map.set(64, '화장품과학과')
            map.set(65, '데이터사이언스학과')
            map.set(66, '실감미디어학과')
            map.set(67, '국제개발협력학과')
            map.set(68, '바이오제약공학과')
            map.set(69, '커피과학과')
            map.set(70, '글로벌한국학과')
            map.set(71, '지식재산권학과')
            map.set(72, '디지털헬스케어융합학과')
            map.set(73, '평화학과')
            map.set(74, '3D프린팅다빈치학과')
            map.set(75, '공연예술무대제작학과')
            map.set(76, '인공지능사이버보안학과')
            map.set(77, '지역산학협력학과')
            map.set(78, '차세대반도체학과')
            map.set(79, '탄소중립융합학과')
            map.set(80, '문화도시학과')
            map.set(81, '연기예술학과')
            map.set(82, '정밀의료융합학과')
            map.set(85, '공공건강보험융합학과')
            map.set(86, '공공인재융합학과')
            break;
        case 76:
            map.set(84, '지역특화청년전문가양성사업단(GTEP)')
            map.set(87, '강원네트워크캠퍼스사업단')
            break;
        case 78:
            map.set(90, '농생명산업학전공')
            map.set(91, '시설농업학전공')
            break;
        case 79:
            map.set(32, '기계의용공학전공')
            map.set(35, '메카트로닉스공학전공')
            map.set(88, '재료공학전공')
            break;
    }

    makeOptions(map, "major")
}

function makeOptions(data, id) {
    const position = $(`#`+id)
    position.empty()
    position.append(`<option selected"></option>`)
    data.forEach((value, key) => {
            const temp = `<option value="${key}">${value}</option>`
            position.append(temp)
        }
    )
}

function search_class() {
    const year = 2023;
    const semester = 1;
    const subjectCd = $("#subject-code").text();
    const college = $("#college option:selected").text();
    const depart = $("#depart option:selected").text();
    const sort = $("#sort option:selected").text();
    const major = $("#major option:selected").text();

    const searchUrl = "http://localhost:8080/api/courses"
    const params = {  // 필요한 query params를 {} 형태에 담아준다.
        year: year,
        semester: semester,
        subjectCd: subjectCd,
        collegeNm: college,
        departNm: depart,
        sortNm: sort,
        majorNm: major
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
                    $('#course-list').empty();

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
                                    <button type="submit" class="btn btn-primary btn-sm" onclick="pre_register(${courseId})">신청</button>
                                </td>
                            </tr>
                            `
                        $('#course-list').append(temp)
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
    let url = "http://localhost:8080/api/registration/" + courseId;
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

function cancel(registrationId) {
    let url = "http://localhost:8080/api/registration/" + registrationId;
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
    let url = "http://localhost:8080/api/registration";
    let token = localStorage.getItem("Authorization");
    fetch(url, {
        method: "GET",
        headers: {
            "Authorization": token
        },
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.success) {
                $('#registration-list').empty();

                result.data.forEach(element => {
                    const registrationId = element.registrationId;
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
            })
        } else {
            console.log(result.errors)
        }
    });
}

function getCoursesFromBasket() {
    let url = "http://localhost:8080/api/basket";
    let token = localStorage.getItem("Authorization");
    fetch(url, {
        method: "GET",
        headers: {
            "Authorization": token
        },
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        if (result.success) {
            $('#basket-list').empty();
            result.data.forEach(element => {
                const courseId = element.courseId;
                const collegeName = element.collegeName;
                const departmentName = element.departmentName == null ? '-' : element.departmentName;
                const majorName = element.majorName  == null ? '-' : element.majorName;
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
                            <button type="button" class="btn btn-primary btn-sm" onclick="register(${courseId})">신청</button>
                        </td>
                    </tr>
                    `
                $('#basket-list').append(temp)
            })
        } else {
            console.log(result.errors)
        }
    });
}
