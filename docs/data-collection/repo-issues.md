---
layout: default
title: PAYG Repository Issues
parent: Data Collection
---

# Data Collection Requirements for PAYG Repository Issues

<img width="997" src="https://raw.githubusercontent.com/suse/premium-support/main/assets/images/lines.png">

## Steps in Collecting Data

1. Run the following command on the affected server, replacing <casenum> with your case number:

   `supportconfig -r <casenum>`

   This will take some minutes and when complete will show “Log file tar ball” location.  

2. sc-repocheck [1] can automatically fix, report, and collect debug data.  Download sc-repocheck to the instance:
   <https://raw.githubusercontent.com/rfparedes/susecloud-repocheck/main/sc-repocheck.py>

3. Run:

   `python3 sc-repocheck.py`

   This will take some minutes and when complete will show "Debug data location" where the tarball is located.

   Check if your issue is fixed or if what is being reported needs to be addressed by you.

[1] <https://github.com/rfparedes/susecloud-repocheck>

## Data to be Provided

- supportconfig tarball
- sc-repocheck tarball

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
