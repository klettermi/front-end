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
        if(response.status == 200) {
            getUserInfo();
        }
        return response.json();
    })
    .then(data => {
        if (data.statusCode == 200) {
            alert(data.msg);
            if(localStorage.getItem('period_name') === "예비수강신청") {
                window.location.replace("reserve-course-registration.html");
            } else if(localStorage.getItem('period_name') === "수강신청") {
                window.location.replace("course-registration.html");
            } else {
                throw new Error("신청 기간이 아닙니다.")
                // alert("신청 기간이 아닙니다.");
            }
        } else {
            alert(data.errors);
        }
    })
    .catch(error => {
        console.error("로그인 중 에러발생:", error);
        alert(error);
    });
}

function getUserInfo(){
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
            console.log(result);
            if (result.success) {
                var data = result.data
                const studentNM = data.studentNM;
                const studentNum = data.studentNum;
                localStorage.setItem('username', studentNM);
                localStorage.setItem('usernumber', studentNum);
            }else {
                console.log(result.errors)
            }
        })
}

function getPeriod(){
    localStorage.clear();

    let timetableUrl = `${BASE_URL}/api/period`

    fetch(timetableUrl, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((result) => {
            if(!result.success) {
                throw new Error(result.errors)
            }
            return result.data
        })
        .then((result) => {
            var date = new Date(result.startTime);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            const period_name = result.periodNM;
            var semester = '';
            switch(month){
                case 2:
                    semester = '1학기'
                    break;
                case 5:
                    semester = '여름학기'
                    break;
                case 8:
                    semester = '2학기'
                    break;
                case 11:
                    semester = '겨울학기'
                    break;
            }
            localStorage.setItem('year', year);
            localStorage.setItem('semester', semester);
            localStorage.setItem('period_name', period_name)
        })
        .catch(error => {
            console.log("신청 기간이 아닙니다", error)
        })
}

function putPeriod() {
    const year = localStorage.getItem('year');
    const semester = localStorage.getItem('semester');

    $('#year').text(year);
    $('#semester').text(semester);
}
