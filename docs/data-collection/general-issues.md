---
layout: default
title: Data Collection Requirements for General OS Issues
parent: Data Collection
---

# Data Collection Requirements for General OS Issues

<img width="997" src="https://raw.githubusercontent.com/rfparedes/suse-premium-docs/main/assets/images/lines.png">

## Steps in Collecting Data

1. Run the following command on the affected server, replacing <casenum> with your case number:

   `supportconfig -l -r <casenum>`

   This will take some minutes and when complete will show “Log file tar ball” location.

2. Provide a text file, `<casenum>.txt` which includes:
   - What error messages (if any) are returned?
   - What troubleshooting steps have already been performed?
   - What date and time (from server perspective) did the problem first occur?
   - Were changes made prior to the problem occurring? If so, what (installation of products, service packs, network changes, and so forth, for example)?
   - Is a workaround available?
   - What is the business impact of the problem?

## Data to be Provided

- supportconfig tarball
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
