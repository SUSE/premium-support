---
layout: default
title: Data Collection Recommendations for Network Issues
parent: Data Collection
---

# Data Collection Recommendations for Network Issues

An unexpected service outage happens. No relevant logs can be found within the OS indicating a connection or system problem except for failures of services that rely on the network. System recovers after a reboot. This may particularly impact workloads in Public Cloud environments.

Collect network state information directly from the kernel on an ongoing basis.  This can be used to prove that service issues started after an external network failure.

From the command line, create a systemd service unit configuration:

```bash
echo '[Unit]
Description="RTNetlink Monitor Daemon"

[Service]
ExecStart=/usr/sbin/rtmon file /var/log/rtmon.log

[Install]
WantedBy=network.target' > /etc/systemd/system/rtmon.service
```

Then enable and start the rtmon.service:
`systemctl enable rtmon --now`

 The logfile is a binary so to view the output of the logfile, run:
 `ip monitor file /var/log/rtmon.log`

 Also see TID, <https://www.suse.com/support/kb/doc/?id=000019863>
