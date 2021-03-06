function basicBarGraph(height, width, _title, _labels, _dataLabel, _data, _images = []) {
    let content = document.querySelector("#content");
    let canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;
    content.appendChild(canvas);
    let ctx = canvas.getContext('2d');

    let backgroundColors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ];

    //console.log("before patterns");
    if (_images != undefined) {
        // let fillPattern = ctx.createPattern(_images[0], 'repeat');
        // backgroundColors = fillPattern;

        let domMatrix = new DOMMatrix()
        backgroundColors = [];
        for (let image of _images) {
            if (image == "white") { //  this will happen when there is an error with getting the icon
                backgroundColors.push("white");
            }
            else {
                let fillPattern = ctx.createPattern(image, 'repeat');
                fillPattern.setTransform(domMatrix.scale(.25));
                backgroundColors.push(fillPattern);
            }
        }

    }
    //console.log("Before bar data");

    let barChartData = {
        labels: _labels,
        datasets: [{
            label: _dataLabel,
            data: [1],
            backgroundColor: backgroundColors,
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    let myChart = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: _title
            }
        }
    });

    barChartData.datasets[0].data = _data;
    console.log(barChartData);
    myChart.update();
}

export { basicBarGraph };