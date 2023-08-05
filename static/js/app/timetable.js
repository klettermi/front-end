function getTimetable(){
    const timetableUrl = "http://localhost:8080/api/students/timetable"
    
    fetch(timetableUrl, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((result) => {
            return result.data
            console.log(result.data)
        })
        .then((result) => {        
            result.forEach(courses => {
                courses = result;

                var table = document.getElementById("table");

                var weekName = ['월', '화', '수', '목', '금', '토', '일'];
                var colorList = ['#FFE3EE', '#FFF0F5', '#FFE4E1', '#FFC0CB', '#FFB0CF', '#FFDCFF', '#FFC3FA', '#FFB4FF', '#FF6EED', '#F4B6D9', '#FFB0D9'];

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

