---
layout: default
title: Data Collection Requirements for SAP Cluster Debug & RCA
parent: Data Collection
---

# Data Collection Requirements for SAP Cluster Debug & RCA

<img width="997" src="https://raw.githubusercontent.com/suse/premium-support/main/assets/images/lines.png">

## Steps in Collecting Data

1. Run the following command on all cluster nodes to install the supportutils-plugin-ha-sap. This extends supportconfig functionality to include system information for SAP and HA cluster:

   `zypper in -y supportutils-plugin-ha-sap`

2. Run the following command on all cluster nodes replacing <casenum> with your case number:

   `supportconfig -l -r <casenum>`

   This will take some minutes and when complete will show “Log file tar ball” location.  

3. Provide an hb_report from the time of the incident with a time frame covering at least two hours before andtwo hours after. Assuming the issue happened on June 19, 2020 at 11:00, run the following on one of the cluster nodes replacing <casenum> with your case number:

   `hb_report -u root -f "2020/06/19 09:00" -t "2020/06/19 13:00" /tmp/<casenum>`

   This will take some minutes and when complete will show “The report is saved in” location.

4. Provide a text file, `<casenum>.txt` which includes:

   - What date and time (from server perspective) did the problem first occur?
   - Were changes made prior to the problem occurring? If so, what (installation of products, service packs, network changes, and so forth, for example)?
   - What is the current state of the cluster?

5. Optional (or by request), provide pengine files. Run the following on each node:

   `tar cvfJ `hostname`-<casenum>.pengine.tar.xz /var/lib/pacemaker/pengine/`

## Data to be Provided

- supportconfig tarball from first node
- supportconfig tarball from second node
- hb_report tarball
- &lt;casenum&gt;.txt file

## Additional Support Information

- SUSE severity level definitions can be found at <https://www.suse.com/support/handbook/#severity>
- An incident is defined as a SUSE severity 1 only when all of these criteria are present:
  - the operation is in production and is mission critical to the business.
  - the product is inoperable.
  - the situation is resulting in a total disruption of work.
  - there is no workaround available.

- The SUSE Technical Support Handbook which includes guidelines on how to use and get the most from technical support can be found at <https://www.suse.com/support/handbook/>

## How to Upload

Upload to your Cloud Service Provider or if instructed to upload directly to SUSE, use one of the following methods:

- <ftp://support-ftp.us.suse.com/incoming/>
- <ftps://support-ftp.us.suse.com/incoming/>
- <https://upload.suse.com/>
  
Additional methods are available here:

- <https://www.suse.com/support/kb/doc/?id=000019214>
