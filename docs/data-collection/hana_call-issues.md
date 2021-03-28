---
layout: default
title: HANA_CALL issues 
parent: Data Collection
---

# HANA_CALL Troubleshooting Data Collection

There are situations where further data is needed to show how close or over the HANA_CALL timeout thresholds a cluster is hitting over an extended period of time. The hanacall-timer tool will time how long multiple HANA_CALL's from the resource agent to HANA take to return. [1]

Install hanacall-timer and enable.

1. Download the binary from Releases (<https://github.com/rfparedes/hanacall-timer/releases/latest/download/gdg>) to /usr/local/bin on the server and run:

    `sudo chmod +x /usr/local/bin/hanacall-timer`

2. Start logging timings every 60 seconds. Specify the correct SIDADM account to use when starting:

    `sudo hanacall-timer start --sidadm <SIDADM>`

3. Once collection has been ongoing, and data has been captured during the time of the issue, stop hanacall-timer:

    `sudo hanacall-timer stop`

4. Provide the tarball after compressing:

    ``tar cvfJ `hostname`-<casenum>.hanacall.tar.xz /var/log/hanacall-timer*``

For documentation and further options [1].

[1] <https://github.com/rfparedes/hanacall-timer>