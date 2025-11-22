# DJ Set Manager - Complete Setup Guide
## One Love Jamaica Relief | Nov 22, 2025

**Base**: DJ_Set_Manager_ASE_JCCI (`appWmtXSMrDKo5e8A`)
**Event**: Mad Oak Bar, Oakland
**Time**: 3:00 PM - 11:00 PM+

---

## 🎯 OVERVIEW

This system manages DJ bookings and event flow for the Jamaica Hurricane Relief fundraiser with **5 different user access levels**:

| Role | Access Level | What They See |
|------|--------------|---------------|
| **Promoter (You/Don)** | Owner - Full Admin | Everything - all tables, views, automations |
| **Venue Owner (Daniel)** | Editor - Event Dashboard | Real-time metrics, schedule, extension decision data |
| **DJs/Selectors** | Form Only | Booking form to select time slots |
| **Public Patrons** | Read-Only | Public schedule showing who's playing when |
| **Unconfirmed DJs** | Form Only | Waitlist/request form for additional slots |

---

## 📊 TABLE STRUCTURE

### Table 1: **DJ_Bookings**
Stores all DJ booking requests and confirmations.

**Fields to Create:**

```
- Booking ID (Auto-number) - Primary key
- DJ Name (Single line text) *Required
- Phone (Phone number)
- Email (Email) *Required
- Preferred Slot (Single select) - Links to time slots
- Backup Slot (Single select)
- Music Style (Multiple select)
  Options: Roots Reggae, Dancehall, Afrobeats, Soca/Calypso,
          Hip Hop/R&B, Classic Lover's Rock, Gospel Reggae
- Social Media (Single line text)
- Equipment Needs (Long text)
- Referral Source (Single select)
  Options: Text from Don, Social Media, Friend, Previous JCCI Event, Other
- Status (Single select)
  Options: Requested, Confirmed, Tentative, Cancelled, No-Show, Completed
- Booking Timestamp (Created time)
- Confirmation Sent (Checkbox)
- Reminded 48hr (Checkbox)
- Reminded 24hr (Checkbox)
- Reminded 4hr (Checkbox)
- Notes (Long text)
```

---

### Table 2: **Time_Slots**
Master schedule with all available time slots.

**Fields to Create:**

```
- Slot ID (Auto-number) - Primary key
- Time Slot (Single line text) - e.g., "4:00-4:30 PM"
- Start Time (Single line text) - 24hr format "16:00"
- End Time (Single line text) - 24hr format "16:30"
- Duration (min) (Number)
- Energy Level (Single select)
  Options: Early Warm Up, Peak Build, Prime Time, Peak Evening, Closing, Transition
- Assigned DJ (Linked record to DJ_Bookings)
- Status (Formula)
  Formula: IF({Assigned DJ}, "Booked", "Available")
- Display Order (Number) - for sorting
```

**Pre-populated Time Slots:**

| Time Slot | Duration | Energy Level | Display Order |
|-----------|----------|--------------|---------------|
| 3:00-4:00 PM | 60 | Early Warm Up | 1 |
| 4:00-4:30 PM | 30 | Early Warm Up | 2 |
| 4:30-5:15 PM | 45 | Early Warm Up | 3 |
| 5:15-5:45 PM | 30 | Transition | 4 |
| 5:45-6:30 PM | 45 | Peak Build | 5 |
| 6:30-7:00 PM | 30 | Transition | 6 |
| 7:00-7:45 PM | 45 | Prime Time | 7 |
| 7:45-8:15 PM | 30 | Transition | 8 |
| 8:15-9:00 PM | 45 | Prime Time | 9 |
| 9:00-9:30 PM | 30 | Transition | 10 |
| 9:30-10:15 PM | 45 | Peak Evening | 11 |
| 10:15-11:00 PM | 45 | Closing | 12 |

---

### Table 3: **Event_Metrics**
Real-time tracking of attendance, vibes, and bar sales during event.

**Fields to Create:**

```
- Entry ID (Auto-number) - Primary key
- Timestamp (Created time)
- Current Time Slot (Linked record to Time_Slots)
- Current DJ (Linked record to DJ_Bookings)
- Attendance Level (Single select)
  Options: Light (<25), Moderate (25-50), Good (50-75), Packed (75-100), Over Capacity (100+)
- Bar Sales Pace (Single select)
  Options: Slow, Steady, Strong, Very Strong
- Vibe Check (Single select)
  Options: Dead, Warming Up, Moving, Hot, Fire 🔥
- Notes (Long text)
- Submitted By (Single line text) - Don or venue staff name
- Extension Recommended (Formula)
  Formula: IF(AND(
    OR({Attendance Level}="Good", {Attendance Level}="Packed", {Attendance Level}="Over Capacity"),
    OR({Bar Sales Pace}="Strong", {Bar Sales Pace}="Very Strong"),
    OR({Vibe Check}="Hot", {Vibe Check}="Fire 🔥")
  ), "✅ YES - Extend Event", "❌ NO - Close at 11pm")
```

---

### Table 4: **Event_Settings**
Master event configuration (single record).

**Fields to Create:**

```
- Event Name (Single line text)
- Event Date (Date)
- Venue Name (Single line text)
- Venue Address (Single line text)
- Doors Time (Single line text)
- Scheduled End Time (Single line text)
- Actual End Time (Single line text)
- Extension Approved (Checkbox)
- Total Attendees Estimate (Number)
- Total Revenue Estimate (Currency)
- Total Raised For Jamaica (Currency)
- Event Status (Single select)
  Options: Planning, Active, Completed
```

---

## 🎨 VIEWS CONFIGURATION

### View 1: **Public Booking Form** (DJ_Bookings)
**Access**: DJs/Selectors and Unconfirmed DJs
**Type**: Form View
**Purpose**: Allow DJs to self-book time slots

**Form Settings:**
- Title: "Book Your Slot - One Love Jamaica Relief 🇯🇲"
- Description: "100% volunteer event. All proceeds go directly to Hurricane Melissa relief efforts."
- Submit button: "Book My Slot for Jamaica"
- Allow multiple submissions: Yes
- Show confirmation message: "Thank you! Check your email for confirmation."

**Fields to Show (in order):**
1. DJ Name *
2. Phone *
3. Email *
4. Preferred Slot * (dropdown of available times)
5. Backup Slot
6. Music Style * (checkboxes)
7. Social Media Handle
8. Equipment Needs
9. How did you hear about this? *

**Fields to Hide:**
- Booking ID, Status, Timestamp, all "Reminded" checkboxes, Notes

---

### View 2: **Public Schedule** (Time_Slots)
**Access**: Public Patrons (read-only)
**Type**: Grid View (shared as public link)
**Purpose**: Anyone can see who's playing when

**Visible Fields:**
- Time Slot
- Status (color-coded)
- Assigned DJ (name only, no contact info)
- Music Style (from linked DJ_Bookings)
- Duration

**Grouping**: By Energy Level
**Sorting**: By Display Order
**Filtering**: Status = "Available" OR "Booked"
**Color Coding**:
- Green = Available
- Blue = Booked/Confirmed
- Yellow = Tentative
- Purple = Currently Playing (manual update during event)
- Gray = Completed

---

### View 3: **Admin - Full Schedule** (Time_Slots)
**Access**: Promoter (Don) only
**Type**: Grid View
**Purpose**: Complete schedule management with all details

**Visible Fields**: ALL fields including contact info
**Grouping**: By Energy Level
**Sorting**: By Display Order
**Editable**: Yes - Don can manually assign/reassign DJs

---

### View 4: **Admin - DJ Roster** (DJ_Bookings)
**Access**: Promoter (Don) only
**Type**: Grid View
**Purpose**: Manage all DJ bookings

**Visible Fields**: ALL fields
**Grouping**: By Status
**Filtering**: Status ≠ "Cancelled"
**Sorting**: By Booking Timestamp (newest first)

**Quick Actions**:
- Mark as Confirmed button
- Mark as No-Show button
- Send Reminder button (via automation)

---

### View 5: **Event Dashboard** (Event_Metrics)
**Access**: Promoter (Don) + Venue Owner (Daniel)
**Type**: Gallery or Kanban View
**Purpose**: Real-time event monitoring

**Visible Fields**:
- Timestamp
- Current Time Slot
- Current DJ
- Attendance Level
- Bar Sales Pace
- Vibe Check
- Extension Recommended (formula result)
- Notes

**Grouping**: By Current Time Slot
**Sorting**: By Timestamp (descending - newest first)
**Color Coding**: By Vibe Check (Fire = Red, Hot = Orange, etc.)

**Quick Entry Form**: Embedded at top for easy mobile updates every 30 minutes

---

### View 6: **Venue Owner Dashboard** (Event_Metrics)
**Access**: Venue Owner (Daniel) only
**Type**: Summary View
**Purpose**: Decision-making data for event extension

**Shows**:
- Latest metrics entry
- Extension recommendation
- Attendance trend (last 3 entries)
- Bar sales trend
- Vibe trend

**Decision Matrix Displayed**:
```
EXTEND EVENT IF:
✅ Attendance: Good or better (50+ people)
✅ Bar Sales: Strong or Very Strong
✅ Vibe: Hot or Fire
✅ Time: After 9:30 PM

CLOSE AT 11PM IF:
❌ Attendance: Light or Moderate (<50)
❌ Bar Sales: Slow or Steady
❌ Vibe: Dead or Warming Up
```

---

## 👥 USER ROLES & PERMISSIONS

### 1. **Promoter (Don McLeod)** - Owner/Creator

**Access Level**: Owner
**Permissions**: Full access to everything

**Can Do**:
- ✅ Create/edit/delete all records
- ✅ Manage all views and forms
- ✅ Set up automations
- ✅ Invite collaborators
- ✅ View all data including contact info
- ✅ Export data
- ✅ Update metrics during event
- ✅ Make final decisions

**Primary Views**:
- Admin - Full Schedule
- Admin - DJ Roster
- Event Dashboard
- All other views

---

### 2. **Venue Owner (Daniel)** - Editor

**Access Level**: Editor (specific tables only)
**Permissions**: Can edit Event_Metrics, read Time_Slots

**Can Do**:
- ✅ View Event Dashboard
- ✅ Submit metric updates (attendance, bar sales, vibe)
- ✅ View public schedule
- ✅ See extension recommendation
- ❌ Cannot see DJ contact info
- ❌ Cannot modify DJ bookings
- ❌ Cannot delete records

**Primary Views**:
- Venue Owner Dashboard
- Public Schedule (read-only)
- Event Metrics Quick Entry Form

**Setup**:
1. In Airtable, go to Share
2. Invite Daniel's email
3. Set permission level: "Editor" on Event_Metrics table only
4. Set "Commenter" on Time_Slots table (read-only)

---

### 3. **DJs/Selectors** - Form Access Only

**Access Level**: No base access, form link only
**Permissions**: Can submit booking form

**Can Do**:
- ✅ Fill out booking form
- ✅ View public schedule (if shared separately)
- ✅ Receive confirmation emails
- ❌ Cannot see other DJs' contact info
- ❌ Cannot modify existing bookings
- ❌ Cannot access base

**What They Get**:
- Shareable form link: `https://airtable.com/appWmtXSMrDKo5e8A/[FORM_ID]`
- Email confirmation after booking
- 48hr, 24hr, and 4hr reminders via email/SMS
- Thank you email after event

**Setup**:
1. Create form view on DJ_Bookings table
2. Get shareable link
3. Send via text/WhatsApp: "Book your slot 👉 [LINK]"

---

### 4. **Public Patrons** - Read-Only Access

**Access Level**: Public shared view link
**Permissions**: Read-only, no login required

**Can Do**:
- ✅ View public schedule
- ✅ See who's playing when
- ✅ See music styles
- ❌ Cannot see DJ contact info
- ❌ Cannot modify anything
- ❌ Cannot book slots

**What They Get**:
- Public schedule link: `https://airtable.com/appWmtXSMrDKo5e8A/[VIEW_ID]`
- Can be embedded on website/Instagram bio
- QR code for easy scanning at venue

**Setup**:
1. On Public Schedule view, click "Share view"
2. Enable "Create a shareable link"
3. Toggle ON "Allow viewers to copy data"
4. Toggle OFF "Restrict access" (make it public)
5. Copy link and create QR code

---

### 5. **Unconfirmed DJs / Waitlist** - Separate Form

**Access Level**: No base access, waitlist form only
**Permissions**: Can submit waitlist request

**Can Do**:
- ✅ Request to be added to lineup
- ✅ Indicate flexible time availability
- ✅ View public schedule
- ❌ Cannot self-book (slots already filled)
- ❌ Cannot modify schedule

**What They Get**:
- Separate waitlist form link
- Auto-reply: "Thanks! We'll contact you if a slot opens up."
- Added to backup DJ list for future events

**Setup**:
1. Create duplicate form view on DJ_Bookings table
2. Rename: "Waitlist - Request a Slot"
3. Add hidden field: Status = "Waitlist"
4. Different confirmation message: "You're on the waitlist! We'll reach out if a slot becomes available."
5. Share separate link

---

## 🤖 AUTOMATIONS TO SET UP

### Automation 1: **Booking Confirmation Email**

**Trigger**: When record created in DJ_Bookings
**Condition**: Status = "Requested"
**Actions**:
1. Send email to DJ with booking details
2. Send notification to Don
3. Update "Confirmation Sent" to TRUE

**Email Template to DJ**:
```
Subject: ✅ Booking Request Received - One Love Jamaica Relief

Hi [DJ Name],

Thank you for signing up to support Hurricane Melissa Relief!

YOUR REQUESTED SLOT:
Time: [Preferred Slot]
Duration: [Duration] minutes
Venue: Mad Oak Bar, 135 12th St, Oakland

STATUS: Pending confirmation - we'll update you within 24 hours.

WHAT TO BRING:
✓ USB drive or laptop with your music
✓ Your best vibes and energy
✓ Arrive 15 minutes before your set

WHY THIS MATTERS:
100% of funds raised go directly to Jamaica relief efforts - Starlink terminals, solar power stations, and emergency supplies for 400,000+ displaced Jamaicans.

VIEW FULL SCHEDULE:
[Public Schedule Link]

Questions? Text Don: (650) 704-8404

One Love,
Don McLeod | JCCI
```

---

### Automation 2: **Slot Confirmation**

**Trigger**: When record updated in DJ_Bookings
**Condition**: Status changed to "Confirmed"
**Actions**:
1. Link to Time_Slots table
2. Update Time_Slots status to "Booked"
3. Send confirmation email with full details

---

### Automation 3: **48-Hour Reminder**

**Trigger**: Every day at 9:00 AM
**Condition**:
- Status = "Confirmed"
- Event Date is 2 days away
- Reminded_48hr = FALSE

**Actions**:
1. Send reminder email
2. Update Reminded_48hr to TRUE

---

### Automation 4: **24-Hour SMS Reminder**

**Trigger**: Every day at 3:00 PM
**Condition**:
- Status = "Confirmed"
- Event Date is tomorrow
- Reminded_24hr = FALSE

**Actions**:
1. Send SMS via Twilio (requires Zapier/Make integration)
2. Update Reminded_24hr to TRUE

**SMS Template**:
```
[DJ Name], this is Don from JCCI. Tomorrow Nov 22 you're playing at [Time] at Mad Oak for Jamaica Relief. Arrive 15min early. See you there bro! 🇯🇲
```

---

### Automation 5: **4-Hour Day-Of Reminder**

**Trigger**: On event day, check every hour
**Condition**:
- Status = "Confirmed"
- Time slot is within next 4 hours
- Reminded_4hr = FALSE

**Actions**:
1. Send urgent email + SMS
2. Update Reminded_4hr to TRUE

---

### Automation 6: **No-Show Alert**

**Trigger**: Manual button click in Admin view
**Condition**: DJ didn't show up

**Actions**:
1. Update Status to "No-Show"
2. Alert Don via SMS
3. Mark Time_Slot as "Available" again for walk-ins

---

## 📱 QR CODES & SHAREABLE LINKS

Generate 4 QR codes for easy access:

### QR Code 1: **DJ Booking Form**
- **URL**: [Your form link]
- **Use**: DJs book their slots
- **Where**: Text messages, Instagram story, printed flyers

### QR Code 2: **Public Schedule**
- **URL**: [Your public view link]
- **Use**: Anyone can see lineup
- **Where**: Posted at venue entrance, Instagram bio, website

### QR Code 3: **Donation Link**
- **URL**: [JCCI donation page]
- **Use**: Direct donations to Jamaica
- **Where**: Posted at venue, on schedule, in emails

### QR Code 4: **Metrics Quick Entry**
- **URL**: [Event_Metrics form link]
- **Use**: Don/Daniel update metrics in real-time
- **Where**: Printed card for Don, Daniel's phone

**To Generate QR Codes**:
1. Use https://www.qr-code-generator.com/
2. Paste each URL
3. Download PNG
4. Print or share digitally

---

## 📊 EVENT DAY WORKFLOW

### Before Event (9 AM):
- [ ] Review Admin - Full Schedule
- [ ] Confirm all "Confirmed" DJs via text
- [ ] Print Public Schedule poster for venue
- [ ] Set up metrics quick entry on phone
- [ ] Test all QR codes
- [ ] Prepare backup Spotify playlist

### During Event (3 PM - 11 PM):
- [ ] Update Event_Metrics every 30 minutes:
  - 3:30, 4:00, 4:30, 5:00, 5:30... until 11:00
- [ ] Monitor DJ transitions (5-10 min overlap)
- [ ] Mark no-shows immediately
- [ ] Add walk-in DJs to open slots
- [ ] Share "Now Playing" updates on Instagram

### Extension Decision (10:00 PM):
- [ ] Review latest Event_Metrics
- [ ] Check Extension Recommended formula
- [ ] Consult with Daniel (venue owner)
- [ ] If YES: Announce extension, fill 11pm-12am slots
- [ ] If NO: Announce last call, prepare to close at 11pm

### After Event:
- [ ] Mark all completed DJs as "Completed"
- [ ] Enter final metrics (total attendance, revenue)
- [ ] Export data for analytics
- [ ] Send thank you emails to all DJs
- [ ] Generate post-event report

---

## 🚀 SETUP CHECKLIST

### Phase 1: Base Structure (Day 1)
- [ ] Create 4 tables with all fields
- [ ] Populate Time_Slots with 12 time slots
- [ ] Add Event_Settings record
- [ ] Add pre-confirmed DJs (Jae5, DJ Smoky, etc.)

### Phase 2: Views & Forms (Day 2)
- [ ] Create Public Booking Form
- [ ] Create Public Schedule view (share publicly)
- [ ] Create Admin views (Full Schedule, DJ Roster)
- [ ] Create Event Dashboard
- [ ] Create Venue Owner Dashboard
- [ ] Test all views on mobile

### Phase 3: Permissions (Day 2)
- [ ] Invite Daniel (venue owner) as Editor on Event_Metrics
- [ ] Generate shareable form link for DJs
- [ ] Generate public schedule link
- [ ] Create waitlist form for unconfirmed DJs

### Phase 4: Automations (Day 3)
- [ ] Set up booking confirmation email
- [ ] Set up 48hr reminder
- [ ] Set up 24hr SMS reminder (via Zapier/Twilio)
- [ ] Set up 4hr day-of reminder
- [ ] Test all automations end-to-end

### Phase 5: Assets & Distribution (Day 4)
- [ ] Generate 4 QR codes
- [ ] Print schedule poster for venue
- [ ] Create Instagram story graphics
- [ ] Prepare WhatsApp message templates

### Phase 6: DJ Outreach (Day 4-5)
- [ ] Send booking link to all DJs
- [ ] Confirm pre-booked DJs (Jae5, Smoky, Bomshel)
- [ ] Post public schedule on social media
- [ ] Print QR codes for venue

---

## 💰 COST ESTIMATE

**Airtable**:
- Pro Plan: $20/month (needed for automations) ✅
- Alternative: Free plan + Zapier ($20/month)

**Twilio SMS**:
- ~$0.0075 per SMS
- Estimated 50 SMS total = $0.38 ✅

**QR Codes**: Free ✅

**Total**: $20-40 for entire event 🎯

---

## 📈 SUCCESS METRICS

**Immediate (Day of Event)**:
- 8+ time slots filled
- Zero double-bookings
- Real-time metrics captured every 30 min
- Data-driven extension decision by 10pm

**Post-Event**:
- No-show rate < 20%
- Total funds raised documented
- DJ database built for future events
- System reusable for next JCCI event

---

## 🎵 READY TO LAUNCH!

Once you've completed the setup checklist, you'll have a professional DJ management system that:

✅ Reduces manual coordination by 80%
✅ Provides transparency to all stakeholders
✅ Enables data-driven decisions
✅ Maximizes fundraising impact
✅ Scales to future JCCI events

---

**Questions?**
Don McLeod | (650) 704-8404 | don@jccint.org

**One Love. One Jamaica. One Mission.** 🇯🇲
