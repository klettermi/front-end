$(document).ready(function () {
    putPeriod();
});

function login() {
    let student_num = document.getElementById("studentNum").value;
    let password = document.getElementById("password").value;

    let loginUrl = `${BASE_URL}/api/auth/login`;

    fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "studentNum": student_num,
            "password": password,
        }),
    })
        .then((response) => {
            let token = response.headers.get("Authorization");
            localStorage.setItem("Authorization", token);
            return response.json();
        })
        .then(data => {
            if (data.statusCode == 200) {
                alert(data.msg);
                window.location.href = "course-registration.html";
            } else {
                alert("로그인 정보가 일치하지 않습니다.");
            }
        })
        .catch(error => {
            console.error("로그인 중 에러발생:", error);
            alert("로그인 중 에러가 발생하였습니다. 다시 시도해 주세요.");
        });
}

function putPeriod() {
    const year = localStorage.getItem('year');
    const semester = localStorage.getItem('semester');

    $('#year').text(year);
    $('#semester').text(semester);
}