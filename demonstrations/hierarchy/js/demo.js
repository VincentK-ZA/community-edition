jsPlumb.ready(function () {

    var color = "gray";
    var canvas = document.getElementById("canvas");

    var instance = jsPlumb.newInstance({
        // notice the 'curviness' argument to this Bezier curve.  the curves on this page are far smoother
        // than the curves on the first demo, which use the default curviness value.
        connector: { type:"Bezier", options:{ curviness: 50, margin: 50 } },
        dragOptions: { cursor: "pointer", zIndex: 2000 },
        paintStyle: { stroke: color, strokeWidth: 2 },
        endpointStyle: { radius: 9, fill: color },
        hoverPaintStyle: {stroke: "#ec9f2e" },
        endpointHoverStyle: {fill: "#ec9f2e" },
        container: canvas
    });

    // suspend drawing and initialise.
    instance.batch(function () {
        var overlays = [
            { type:"Arrow", options:{ location: 0.7, foldback:0.7, fill:color, width:14 }},
            { type:"Arrow", options:{ location: 0.3, direction: -1, foldback:0.7, fill:color, width:14 }}
        ];

        // add endpoints, giving them a UUID.
        // you DO NOT NEED to use this method. You can use your library's selector method.
        // the jsPlumb demos use it so that the code can be shared between all three libraries.
        var windows = document.querySelectorAll(".chart-demo .window");
        for (var i = 0; i < windows.length; i++) {
            instance.addEndpoint(windows[i], {
                uuid: windows[i].getAttribute("id") + "-bottom",
                anchor: "Bottom",
                maxConnections: -1
            });
            instance.addEndpoint(windows[i], {
                uuid: windows[i].getAttribute("id") + "-top",
                anchor: "Top",
                maxConnections: -1
            });
        }

        instance.connect({uuids: ["chartWindow1-bottom", "chartWindow3-top" ], overlays: overlays});

    });
});
