var ctx = document.getElementById('myChart').getContext('2d');
const GLOBAL = 14
function fetchData() {
    fetch("./ZonAnn.Ts+dSST.csv")
        .then(r => r.text())
        .then(data => {
            const parseData = Papa.parse(data, {
                header: true
            }).data
            const mappedData = parseData.reduce((acc, el) => {
                acc.year.push(el.Year);
                acc.tempsGlob.push(Number(el.Glob) + GLOBAL);
                acc.tempsNHem.push(Number(el.NHem) + GLOBAL);
                acc.tempsSHem.push(Number(el.SHem) + GLOBAL);
                return acc
            },
                { year: [], tempsGlob: [], tempsNHem: [], tempsSHem: [] }
            )
           
            
            new Chart(ctx, {
            type: 'line',
            data: {
                labels: mappedData.year,
                datasets: [{
                    label: 'NHem',
                    data: mappedData.tempsNHem,
                    backgroundColor: 'red',
                    borderColor:'red',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'SHem',
                    data: mappedData.tempsSHem,
                    backgroundColor: "blue",
                    borderColor:'blue',
                    borderWidth: 1,
                    fill: false
                    },
                {
                    label: 'Global',
                    data: mappedData.tempsGlob,
                    backgroundColor: "black",
                    borderColor:'black',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            callback(value) {
                                return value + "°С"
                            }
                        }
                    }
                }
            }
            
        });
    })
}

fetchData()


