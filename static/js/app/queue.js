$(document).ready(function () {
    let totalPeople = 10;
    let currentWaitingCount = 0;

    function updateQueueInfo() {
        $('#waitingCount').text(currentWaitingCount);

        const averageTimePerPerson = 5;
        const waitingTime = currentWaitingCount * averageTimePerPerson;
        $('#waitingTime').text(waitingTime + ' minutes');

        const progressPercentage = (currentWaitingCount / totalPeople) * 100;
        $('.progress-bar').css('width', progressPercentage + '%').attr('aria-valuenow', progressPercentage);
    }

    $('#addToQueue').click(function () {
        if (currentWaitingCount < totalPeople) {
            currentWaitingCount++;
            updateQueueInfo();
        }
    });

    $('#serveFromQueue').click(function () {
        if (currentWaitingCount > 0) {
            currentWaitingCount--;
            updateQueueInfo();
        }
    });

    updateQueueInfo();
});

// after connected with back-end
// $(document).ready(function () {
//     function updateQueueInfo() {
//         $.get('/api/queue/info', function (data) {
//             $('#waitingCount').text(data.waitingCount);
//             $('#waitingTime').text(data.waitingTime + ' minutes');
//             $('.progress-bar').css('width', data.progressPercentage + '%').attr('aria-valuenow', data.progressPercentage);
//         });
//     }

//     $('#addToQueue').click(function () {
//         $.post('/api/queue/add', function () {
//             updateQueueInfo();
//         });
//     });

//     $('#serveFromQueue').click(function () {
//         $.post('/api/queue/serve', function () {
//             updateQueueInfo();
//         });
//     });

//     updateQueueInfo();
// });
