function changeH1(){
    const h1 = document.getElementsByTagName('h1')
    h1[0].innerText = localStorage.getItem('year') + '학년도 ' + localStorage.getItem('semester') + ' 시간표'
}
function getTimetable(){
    let timetableUrl = `${BASE_URL}/api/students/timetable`
    let token = localStorage.getItem("Authorization");
    fetch(timetableUrl, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    })
        .then((response) => response.json())
        .then((result) => {
            return result.data
        })
        .then((result) => {        
            result.forEach(courses => {
                courses = result;
            
                var table = document.getElementById("table");

                var weekName = ['월', '화', '수', '목', '금', '토', '일'];
                var colorList = ['#7FFFD4', '#B0E0E6', '#AFEEEE', '#ADD8E6', '#B0C4DE',
                                 '#87CEEB', '#87CEFA', '#48D1CC', '#40E0D0', '#00CED1', 
                                 '#00FFFF', '#00BFFF', '#1E90FF', '#6495ED', '#6495ED',];

                var table = document.getElementById("table");
                var tbody = document.getElementById("table").getElementsByTagName("tbody")[1];

                for(var k = 0; k < courses.length; k++){
                    var course = courses[k];
                    var colorRandom = Math.floor(Math.random() * 11);
                    var name = course.courseNM;
                    for(var i = 0; i < course.timetable.length; i++){
                        var week = searchWeek(course.timetable[i][0]);
                        var start_time = Number(course.timetable[i][1]);
                        var end_time = Number(course.timetable[i][course.timetable[i].length-1]);
                        var row = table.rows[start_time];
                        var cell = row.cells[week];
                        var color = colorList[colorRandom];
                        cell.textContent = name;
                        cell.setAttribute("style", "background: "+color);
                        
                        if(end_time - start_time != 0){
                          cell.setAttribute("rowspan", end_time - start_time + 1);
                          for(var j = start_time+1; j <= end_time; j++){
                            table.rows[j].deleteCell(-1);
                          }
                        }
                    }
                }

                function searchWeek(week){
                    var weekNum;
                    for(var i = 0; i < weekName.length; i++){
                        if(weekName[i] == week){
                            weekNum = i + 1;
                        }
                    }
                    return weekNum;
                }
            })
        })
}

