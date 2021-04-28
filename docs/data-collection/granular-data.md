---
layout: default
title: Granular Data Collection 
parent: Data Collection
---

# Granular Data Collection

There are situations that require granular data from the time of the issue to troubleshoot OS issues. gdg (Granular Data Gatherer) is a tool which collects granular data every user specified interval (default: 30 seconds).  More documentation about which data is collected and further information can be found here: [1]

Install gdg (Granular Data Gatherer) and enable.

1. Download the binary from Releases (<https://github.com/rfparedes/gdg/releases/latest/download/gdg>) to /usr/local/sbin on the server and run:

    `sudo chmod +x /usr/local/sbin/gdg`

2. Start logging in 30 second intervals

    `sudo /usr/local/sbin/gdg --start --interval 30 --logdays 7`

3. Once collection has been ongoing, and data has been captured during the time of the issue, stop gdg:

    `sudo /usr/local/sbin/gdg --stop`

4. Provide the tarball after compressing:

    ``tar cvfJ `hostname`-<casenum>.gdg.tar.xz /var/log/gdg-data/``

For documentation and further options [1].

[1] <https://github.com/rfparedes/gdg>
