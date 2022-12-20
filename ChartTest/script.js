//https://www.chartjs.org/docs/latest/samples/line/line.html web link za ove vrste charta sa svo pripadajucom dokumentacijom
//LINE CHART
const lineChart = document.getElementById('lineChart'); //dohvacanje bar charta po idu

const labels = [
    '22 Ozujak',
    '23 Ozujak',
    '24 Ozujak',
    '25 Ozujak',
    '26 Ozujak',
    '27 Ozujak',
    '28 Ozujak',
    '29 Ozujak',
    '01 Travanj',
    '02 Travanj',
    '03 Travanj',
    '04 Travanj'
];

new Chart(lineChart , { //prvi argument ove klase je barChart
                        //podatci za chart
    type: 'line', //VRSTA CHARTA
    data: { //podatci kojima hranimo chart (popunjavamo)
        labels: labels,
        datasets: [ // stavljamo [] jer imamo niz od dvije vrste podataka
            { // 1 objekat
                label: 'Povratni pregledi', // naziv 
                data: [1844, 1554, 1273, 1284, 1126, 946, 964, 1793, 1432, 1130, 1074, 954, 856, 833, 1536, 1416, 1248, 1226], //niz podataka
                borderColor: 'rgba(66, 138, 245, 1)', //stavljamo rgba zbog mogucnosti koristenja opacity
            },
            { // 2 objekat
                label: 'Novi pregledi',
                data: [1199, 1314, 1147, 1403, 1217, 1015, 1138, 1272, 957, 862, 716, 712, 610, 585, 847, 744, 756, 781],
                borderColor: 'rgba(86, 18, 52, 1)',
            }
        ]
    }

});


//PIE CHART

const pieChart = document.getElementById('pieChart'); //dohvacanje bar charta po idu

    new Chart(pieChart, {
        type: 'pie', //moguce vrste charta pisu u dokumentaciji charta na webu 
        data: {
            labels: ['Srbija', 'BiH', 'Hrvatska', 'S. Makedonija', 'CG', 'Ostali'],
            datasets: [
                {
                    label: 'Drzave',
                    data: [ 49.6, 20.3, 9.5, 3.6, 2.6, 14.4], // uparujemo po redoslijedu s drzavama
                    backgroundColor: [
                        'rgba(52, 235, 143, 1)',
                        'rgba(235, 201, 52, 1)',
                        'rgba(52, 153, 235, 1)',
                        'rgba(235, 52, 119, 1)',
                        'rgba(186, 52, 235, 1)',
                        'rgba(52, 153, 170, 1)'
                    ]
                }
            ] 
        }
    
    });


    //BAR CHART
const barChart = document.getElementById('barChart'); //dohvacanje bar charta po idu

    new Chart(barChart, {
        type: 'bar',
        data: {
            labels: ['13 - 17', '18 - 24', '25 - 35', '35 – 44', '45 – 54', '55 – 64', '65+'],
            datasets: [
                {
                    label: 'Publika po godinama',
                    data: [1.7,43.3,34.4,13.6,5.6,1.2,0.3],
                    backgroundColor: [
                        'rgba(52, 235, 143, 1)',
                        'rgba(235, 201, 52, 1)',
                        'rgba(52, 153, 235, 1)',
                        'rgba(235, 52, 119, 1)',
                        'rgba(186, 52, 235, 1)',
                        'rgba(52, 153, 170, 1)'
                    ]
                }
            ]
        }
    });