---
title: Voraca
label: voraca
thumbnail: voraca.png
links: ["https://github.com/raphaelmenges/Voraca", "https://kola.opus.hbz-nrw.de/frontdoor/index/index/docId/809", "https://github.com/raphaelmenges/PerVoxelRaycaster"]
linktitles: ["GitHub Project", "Bachelor Thesis (German)", "Per-Voxel-Ray-Caster"]
---
This program for visualizing volume data from CT- or MRI-sources was part of my bachelor thesis. It utilizes a ray-casting algorithm to iterate through the data and fetch the raw values. This raw values are then used as input for a look up in a transfer function which holds material information like color, fresnel or emission. There are multiple acceleration methods available like *Early-Ray-Termination* or *Empty-Space-Skipping*. In addition, local illumination, shadows and a simple *Pre-Integration* of the transfer function values is available.