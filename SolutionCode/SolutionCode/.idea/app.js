function getExcerciseInfo() {
    return {
        excerciseNumber: 5,
        isAnimated: false,
        source: "https://www.umweltbundesamt.de"
    };
}

/*
    Create a Parallel Coordinates plot of the given data (Luftdaten_neu.csv) on your own.
    If you like, you can use the example from here:
    https://www.d3-graph-gallery.com/graph/parallel_basic.html as a template.
    However, how you create the visualization and exactly how you design it is up to you,
    as long as you use either two.js or d3.
*/
function draw(two) {
    // Definition der Größe des Koordinatensystems
    const width = 400;
    const height = 300;

    // Erstellen einer Two.js-Zeichenfläche
    const params = { width: width, height: height };
    const svg = new Two(params).appendTo(document.body);

    // Koordinatensystem zeichnen
    const xAxis = two.makeLine(50, height - 50, width - 50, height - 50);
    const yAxis = two.makeLine(50, height - 50, 50, 50);

    // Beschriftungen der Achsen hinzufügen
    const xLabel = two.makeText("Grades", width, height - 50);
    const yLabel = two.makeText("Students", 50, 20);

    // Ticks auf der x-Achse
    const grades = ["", "1.0", "1.3", "1.7", "2.0", "2.3", "2.7", "3.0", "3.3", "3.7", "4.0", "5.0"];
    const numTicks = grades.length;
    const tickSpacing = (width - 100) / numTicks;

    for (let i = 0; i < numTicks; i++) {
        const xPos = 50 + i * tickSpacing;
        const tick = two.makeLine(xPos, height - 50, xPos, height - 45);
        const label = two.makeText(grades[i].toString(), xPos, height - 25);
    }

    // Laden und zeichnen Sie die Daten aus der CSV-Datei
    Papa.parse("/DesignuebungGrades2021.csv", {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;

            // Zeichnen Sie das Histogramm basierend auf den CSV-Daten
            for (let i = 0; i < data.length; i++) {
                const grade = parseFloat(data[i].Grade);
                const barHeight = data[i].Count * 20; // Skalierung für die Darstellung

                const bar = two.makeRectangle(50 + grades.indexOf(grade) * 50, 250 - barHeight / 2, 30, barHeight);
                bar.fill = "rgb(0, 100, 200)";
            }

            // Aktualisieren Sie die Darstellung
            two.update();
        }
    });
}