function login() {
    let student_num = document.getElementById("student_num").value;
    let password = document.getElementById("password").value;

    let loginUrl = "http://localhost:8080/api/auth/login";

    fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "student_num": student_num,
            "password": password,
        }),
    })
    .then((response) => {
        let token = response.headers.get("Authorization");
        localStorage.setItem("Authorization", token);
        return response.json();
    })
    .then(data => {
        console.log(data.status_code)
        if (data.status_code == 200) {
            alert(data.message);
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