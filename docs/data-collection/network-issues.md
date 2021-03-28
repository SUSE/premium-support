---
layout: default
title: Network Issues
parent: Data Collection
---

# Data Collection Recommendations for Network Issues

An unexpected service outage happens. No relevant logs can be found within the OS indicating a connection or system problem except for failures of services that rely on the network. System recovers after a reboot. This may particularly impact workloads in Public Cloud environments.

Collect network state information directly from the kernel on an ongoing basis.  This can be used to prove that service issues started after an external network failure.

Install gdg (Granular Data Gatherer) [1] and enable rtmon.

1. Download the binary from Releases (<https://github.com/rfparedes/gdg/releases/latest/download/gdg>) to /usr/local/sbin on the server and run:

    `sudo chmod +x /usr/local/sbin/gdg`

2. Toggle rtmon logging on

    `sudo /usr/local/sbin/gdg -rtmon`

3. Once collection has been ongoing, to view network state information:

    `ip monitor file /var/log/gdg-data/rtmon/rtmon.log`

For documentation and further options [1].

[1] <https://github.com/rfparedes/gdg>
