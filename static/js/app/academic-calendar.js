function getPeriod() {
    let timetableUrl = `${BASE_URL}/api/period`
    fetch(timetableUrl, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((result) => {
            return result.data
        })
        .then((result) => {
            var date = new Date(result.startTime);
            var year = date.getFullYear() + '학년도';
            var month = date.getMonth() + 1;
            var semester = '';
            switch (month) {
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
            localStorage.clear();
            localStorage.setItem('year', year);
            localStorage.setItem('semester', semester);
        })
}