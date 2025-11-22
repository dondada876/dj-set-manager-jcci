# Product Requirements Document (PRD)
## One Love Jamaica Relief - DJ Booking & Event Management System

**Version:** 1.0  
**Date:** November 21, 2025  
**Owner:** Don McLeod, JCCI  
**Event Date:** November 22, 2025  
**Venue:** Mad Oak Bar, 135 12th St, Oakland, CA

---

## 1. EXECUTIVE SUMMARY

Create an Airtable-based DJ booking and event management system that allows DJs to self-select time slots via a public link, manages event flow from early warm-up through peak evening hours, and tracks real-time attendance/revenue metrics to determine event extension viability.

**Key Success Metrics:**
- 8-10 DJ slots filled by day of event
- Smooth transitions between DJs (5-10 min overlap)
- Event attendance tracked for extension decision (post-10pm)
- Revenue tracking to maximize Jamaica relief donations

---

## 2. PROBLEM STATEMENT

**Current Issues:**
- Manual DJ scheduling via text/WhatsApp creates confusion
- No centralized system to see available time slots
- Last-minute cancellations leave gaps in lineup
- No data-driven decision making for event extension
- Can't track which DJ/time slot drives most attendance/revenue

**Impact:**
- Scheduling conflicts and double-bookings
- Dead air time when DJs no-show
- Missed revenue opportunities
- Unable to optimize future events based on data

---

## 3. SOLUTION OVERVIEW

Build an Airtable system with:
1. **Public DJ Booking Form** (shareable link)
2. **Real-time Schedule Grid View** (visible to all)
3. **Automated Email Confirmations** (to DJs and organizer)
4. **Event Flow Dashboard** (track attendance, revenue, vibes)
5. **Post-Event Analytics** (optimize future events)

---

## 4. USER PERSONAS

### Primary Users:

**A. Event Organizer (Don)**
- Needs: Real-time overview of all bookings, ability to adjust schedule, attendance/revenue tracking
- Pain Points: Manual coordination, last-minute changes, no visibility into event performance

**B. DJ/Selector**
- Needs: Easy way to book slot, see what times are available, get confirmation
- Pain Points: Unclear communication, double-bookings, not knowing who plays before/after them

**C. Venue Manager (Daniel - Mad Oak)**
- Needs: Know event flow, make data-driven decision on extension past 10pm
- Pain Points: Can't tell if event is profitable enough to extend

**D. Attendee/Donor**
- Needs: Know who's playing when, understand event schedule
- Pain Points: Show up and favorite DJ already finished, unclear event timeline

---

## 5. FUNCTIONAL REQUIREMENTS

### 5.1 DJ BOOKING SYSTEM

**Public Booking Form** (Airtable Form View)

**Required Fields:**
- DJ/Selector Name* (text)
- Phone Number* (text)
- Email* (email)
- Preferred Time Slot* (single select dropdown)
  - 4:00-4:30 PM (30 min - Early Warm Up)
  - 4:30-5:15 PM (45 min - Early Warm Up)
  - 5:15-5:45 PM (30 min - Transition)
  - 5:45-6:30 PM (45 min - Peak Build)
  - 6:30-7:00 PM (30 min - Transition)
  - 7:00-7:45 PM (45 min - Prime Time)
  - 7:45-8:15 PM (30 min - Transition)
  - 8:15-9:00 PM (45 min - Prime Time)
  - 9:00-9:30 PM (30 min - Transition)
  - 9:30-10:15 PM (45 min - Peak Evening)
  - 10:15-11:00 PM (45 min - Closing/Extension)
  - FLEXIBLE - I'll take any available slot
  
- Backup Time Slot (single select - same options)
- Music Style/Vibe* (multiple select)
  - Roots Reggae
  - Dancehall
  - Afrobeats
  - Soca/Calypso
  - Hip Hop/R&B
  - Classic Lover's Rock
  - Gospel Reggae
  
- Social Media Handle (text) - for promotion
- Special Equipment Needs (long text)
- How did you hear about this event? (single select)
  - Text/WhatsApp from Don
  - Social Media
  - Friend/Word of Mouth
  - Previous JCCI Event
  - Other

**Automated Actions:**
- DJ receives confirmation email with their slot details
- Don receives notification of new booking
- If slot already filled, DJ gets waitlist confirmation
- 24hr reminder SMS sent to DJ before their slot

---

### 5.2 SCHEDULE MANAGEMENT GRID

**Grid View (Public - Read Only)**

**Columns:**
- Time Slot
- DJ Name
- Status (Available/Booked/Confirmed/Active/Completed)
- Music Vibe
- Duration
- Energy Level (Early Warm Up/Peak Build/Prime Time/Peak Evening/Closing)
- Contact (hidden from public, visible to Don)

**Color Coding:**
- 🟢 Green = Available
- 🟡 Yellow = Tentatively Booked
- 🔵 Blue = Confirmed
- 🟣 Purple = Currently Playing
- ⚫ Gray = Completed

**Filtering:**
- Show only available slots
- Show by music vibe
- Show by time period (Early/Prime/Late)

---

### 5.3 EVENT FLOW DASHBOARD

**Real-Time Tracking View (Don/Venue Only)**

**Metrics to Track:**

**Attendance:**
- Estimated crowd size (manual entry every 30 min)
  - Light (<25)
  - Moderate (25-50)
  - Good (50-75)
  - Packed (75-100)
  - Over Capacity (100+)

**Revenue Indicators:**
- Bar sales pace (from Daniel)
  - Slow
  - Steady
  - Strong
  - Very Strong
  
**Vibe Check:**
- Dance floor energy (manual entry)
  - Dead
  - Warming Up
  - Moving
  - Hot
  - Fire 🔥

**Decision Matrix for Extension:**
```
EXTEND IF:
- Attendance: Good or Packed (50+ people)
- Bar Sales: Strong or Very Strong
- Vibe: Hot or Fire
- Time: 9:30pm or later

CLOSE AT 11PM IF:
- Attendance: Light or Moderate (<50 people)
- Bar Sales: Slow or Steady
- Vibe: Dead or Warming Up
```

**Entry Method:**
- Quick form accessible via mobile QR code
- Don or venue staff can update every 30 minutes
- Automated timestamp for each entry

---

### 5.4 PRE-EVENT AUTOMATION

**Email Sequence (via Airtable Automations + Zapier/Make):**

**1. Immediate Booking Confirmation**
```
Subject: You're Confirmed! One Love Jamaica Relief - Nov 22

[DJ NAME],

Thank you for supporting Hurricane Melissa Relief! 🇯🇲

YOUR SET:
Time: [TIME SLOT]
Duration: [30 or 45] minutes
Venue: Mad Oak Bar, 135 12th St, Oakland

IMPORTANT DETAILS:
- Arrive 15 min before your slot
- Bring USB/laptop with your music
- Plan to overlap 5-10 min with next DJ for smooth transition
- This is 100% VOLUNTEER - no payment, just supporting Jamaica

WHAT WE'RE RAISING FUNDS FOR:
- Starlink internet terminals
- Solar power stations
- Emergency supplies for 400,000+ displaced Jamaicans

Questions? Text/call Don: (650) 704-8404

One Love,
JCCI Team
```

**2. 48-Hour Reminder**
```
Subject: 2 Days Away - One Love Jamaica Relief

[DJ NAME],

Quick reminder: You're playing THIS FRIDAY Nov 22 at [TIME]

Set Details: [TIME SLOT] | [DURATION] | Mad Oak Bar

Please confirm you're still good by replying to this email or texting Don at (650) 704-8404.

If anything changed, let us know ASAP so we can fill your slot.

See you Friday!
JCCI
```

**3. 24-Hour Reminder (SMS)**
```
[DJ NAME], this is Don from JCCI. Tomorrow Nov 22 you're playing at [TIME] at Mad Oak for Jamaica Relief. Confirm you're good? Thanks bro. 🇯🇲
```

**4. 4-Hour Day-Of Reminder**
```
Subject: TODAY - You're On at [TIME]!

[DJ NAME],

Today's the day! You're up at [TIME].

Arrive by [15 MIN BEFORE] to set up.

Current lineup:
[PREVIOUS DJ] → YOU → [NEXT DJ]

Mad Oak Bar | 135 12th St, Oakland
Doors at 3pm

Let's make this special for Jamaica 🇯🇲

One Love,
Don
```

---

### 5.5 POST-EVENT ANALYTICS

**Reporting Dashboard (Grid View)**

**Metrics to Capture:**

**Per Time Slot:**
- DJ Name
- Time Slot
- Actual Start/End Time
- Estimated Attendance During Slot
- Vibe Rating
- Bar Sales Pace
- Music Style Played
- Showed Up? (Yes/No)

**Overall Event:**
- Total Unique DJs
- No-Show Rate
- Peak Attendance Time
- Best Performing Time Slot (attendance + revenue)
- Most Popular Music Style
- Event Extension? (Yes/No)
- Actual End Time
- Total Estimated Attendance
- Total Revenue Estimate (from Daniel)
- Total Funds Raised for Jamaica

**Export Options:**
- CSV for further analysis
- PDF report for sponsors/partners
- Social media recap graphics

---

## 6. TECHNICAL ARCHITECTURE

### 6.1 Airtable Base Structure

**Tables:**

**Table 1: DJ_Bookings**
```
Fields:
- Booking_ID (auto-number) [Primary Key]
- DJ_Name (text)
- Phone (phone number)
- Email (email)
- Preferred_Slot (single select - linked to Time_Slots)
- Backup_Slot (single select - linked to Time_Slots)
- Music_Style (multiple select)
- Social_Media (text)
- Equipment_Needs (long text)
- Referral_Source (single select)
- Status (single select: Requested/Confirmed/Cancelled/No-Show/Completed)
- Booking_Timestamp (created time)
- Confirmation_Sent (checkbox)
- Reminded_48hr (checkbox)
- Reminded_24hr (checkbox)
- Reminded_4hr (checkbox)
- Notes (long text)
```

**Table 2: Time_Slots**
```
Fields:
- Slot_ID (auto-number) [Primary Key]
- Time_Slot (text) - e.g., "4:00-4:30 PM"
- Start_Time (text)
- End_Time (text)
- Duration_Minutes (number)
- Energy_Level (single select: Early Warm Up/Peak Build/Prime Time/Peak Evening/Closing)
- Assigned_DJ (linked record to DJ_Bookings)
- Status (formula: if Assigned_DJ exists, "Booked", else "Available")
- Display_Order (number) - for sorting
```

**Table 3: Event_Metrics**
```
Fields:
- Entry_ID (auto-number) [Primary Key]
- Timestamp (created time)
- Current_Time_Slot (linked record to Time_Slots)
- Current_DJ (linked record to DJ_Bookings)
- Attendance_Level (single select: Light/Moderate/Good/Packed/Over Capacity)
- Bar_Sales_Pace (single select: Slow/Steady/Strong/Very Strong)
- Vibe_Check (single select: Dead/Warming Up/Moving/Hot/Fire)
- Notes (long text)
- Submitted_By (text) - Don or venue staff name
```

**Table 4: Event_Settings**
```
Fields:
- Event_Name (text)
- Event_Date (date)
- Venue_Name (text)
- Venue_Address (text)
- Doors_Time (text)
- Scheduled_End_Time (text)
- Actual_End_Time (text)
- Extension_Approved (checkbox)
- Total_Attendees_Estimate (number)
- Total_Revenue_Estimate (currency)
- Total_Raised_For_Jamaica (currency)
- Event_Status (single select: Planning/Active/Completed)
```

---

### 6.2 Views Configuration

**View 1: Public Booking Form**
- Form view of DJ_Bookings table
- Shows only: DJ_Name, Phone, Email, Preferred_Slot, Backup_Slot, Music_Style, Social_Media, Equipment_Needs, Referral_Source
- Submit button text: "Book My Slot for Jamaica Relief"

**View 2: Public Schedule (Embedded on Website)**
- Grid view of Time_Slots table
- Filtered: Status = "Available" OR "Booked"
- Grouped by: Energy_Level
- Sorted by: Display_Order
- Visible fields: Time_Slot, Status, Assigned_DJ (Name only), Music_Style, Duration
- Shared as read-only public link

**View 3: Admin - Full Schedule**
- Grid view of Time_Slots table
- Shows all fields including contact info
- Grouped by: Energy_Level
- Colored by: Status
- Editable by Don only

**View 4: Admin - DJ Roster**
- Grid view of DJ_Bookings table
- Grouped by: Status
- Filtered: Status ≠ "Cancelled"
- Shows all fields
- Editable by Don only

**View 5: Event Dashboard**
- Gallery or Kanban view of Event_Metrics
- Grouped by: Current_Time_Slot
- Sorted by: Timestamp (descending)
- Color coded by: Vibe_Check
- Quick entry form at top

**View 6: Analytics Report**
- Grid view of Event_Metrics
- Joined with Time_Slots and DJ_Bookings
- Summary fields showing averages
- Exportable as CSV/PDF

---

### 6.3 Automation Workflows

**Automation 1: Booking Confirmation Email**
```
Trigger: New record created in DJ_Bookings
Condition: Status = "Requested"
Action: 
  1. Send email to DJ with booking details
  2. Send email to Don with new booking notification
  3. Update Confirmation_Sent to TRUE
  4. If Preferred_Slot already booked, change Status to "Waitlist" and send different email
```

**Automation 2: Slot Assignment**
```
Trigger: Record updated in DJ_Bookings
Condition: Status changed to "Confirmed"
Action:
  1. Link record to Time_Slots table (Preferred_Slot)
  2. Update Time_Slots status to "Booked"
  3. Send confirmation with full details to DJ
```

**Automation 3: 48-Hour Reminder**
```
Trigger: Scheduled automation runs daily at 9am
Condition: 
  - Status = "Confirmed"
  - Event_Date is 2 days away
  - Reminded_48hr = FALSE
Action:
  1. Send reminder email to DJ
  2. Update Reminded_48hr to TRUE
```

**Automation 4: 24-Hour SMS Reminder**
```
Trigger: Scheduled automation runs daily at 3pm
Condition:
  - Status = "Confirmed"
  - Event_Date is 1 day away
  - Reminded_24hr = FALSE
Action:
  1. Send SMS via Twilio integration
  2. Update Reminded_24hr to TRUE
```

**Automation 5: 4-Hour Day-Of Reminder**
```
Trigger: Scheduled automation runs on event day
Condition:
  - Status = "Confirmed"
  - Time_Slot is within next 4 hours
  - Reminded_4hr = FALSE
Action:
  1. Send urgent email/SMS
  2. Update Reminded_4hr to TRUE
```

**Automation 6: No-Show Alert**
```
Trigger: Manual button click in Admin view
Condition: DJ didn't show up for their slot
Action:
  1. Update Status to "No-Show"
  2. Send alert to Don
  3. Mark Time_Slot as "Available" again for walk-ins
```

---

### 6.4 Integration Requirements

**Required Integrations:**

**1. Email (Native Airtable or Sendgrid)**
- Send booking confirmations
- Send reminder emails
- Send post-event thank you

**2. SMS (Twilio via Zapier/Make)**
- Send 24hr reminder
- Send day-of urgent reminders
- Send real-time updates to Don

**3. QR Code Generator (via Airtable App)**
- Generate unique QR codes for:
  - Public booking form
  - Public schedule view
  - Event metrics quick entry form
  - Donation link to JCCI

**4. Calendar Sync (Optional - via Zapier)**
- Auto-create calendar events for each DJ's slot
- Send calendar invites to DJs
- Sync with Google Calendar for public display

**5. Social Media (Buffer/Hootsuite via Zapier)**
- Auto-post schedule updates
- Post "Now Playing" updates in real-time
- Post thank you messages to DJs after event

---

## 7. USER INTERFACE & EXPERIENCE

### 7.1 DJ Booking Flow

**Step 1: DJ receives shareable link via text/email**
```
"Book your slot for One Love Jamaica Relief!
👉 [AIRTABLE FORM LINK]
First come, first served. All volunteer, 100% for Jamaica 🇯🇲"
```

**Step 2: DJ clicks link, sees clean form**
- Mobile-optimized
- Shows real-time slot availability at top
- Clear instructions about volunteer nature
- Estimated time to complete: 2 minutes

**Step 3: DJ selects preferred slot**
- Dropdown shows only available slots in green
- Already booked slots marked red (not selectable)
- Option to select backup slot

**Step 4: DJ completes form and submits**
- Immediate confirmation message on screen
- Email confirmation arrives within 1 minute
- Link to view full public schedule

**Step 5: DJ receives reminders**
- 48 hours before: Email reminder
- 24 hours before: SMS reminder
- 4 hours before: Urgent SMS + email

---

### 7.2 Public Schedule Display

**Embedded on JCCI Website or Instagram Bio Link**

```
┌─────────────────────────────────────┐
│   ONE LOVE JAMAICA RELIEF           │
│   Friday, November 22, 2025         │
│   Mad Oak Bar, Oakland              │
└─────────────────────────────────────┘

🌅 EARLY WARM UP (3pm-6pm)
✅ 3:00-4:00 PM - Spotify Classics
🟢 4:00-4:30 PM - AVAILABLE
🔵 4:30-5:15 PM - DJ Smoky
🟢 5:15-5:45 PM - AVAILABLE

🔥 PEAK BUILD (6pm-8pm)
🔵 5:45-6:30 PM - Jae5
🟢 6:30-7:00 PM - AVAILABLE
🔵 7:00-7:45 PM - DJ Bomshel

⭐ PRIME TIME (8pm-10pm)
🟢 7:45-8:15 PM - AVAILABLE
🟡 8:15-9:00 PM - TENTATIVE
🟢 9:00-9:30 PM - AVAILABLE

🌙 PEAK EVENING (10pm-11pm+)
🟡 9:30-10:15 PM - DJ Gee Power
🟢 10:15-11:00 PM - AVAILABLE

[BOOK YOUR SLOT] [DONATE NOW]
```

**Legend:**
- 🟢 Available - Book Now!
- 🔵 Confirmed
- 🟡 Tentative
- ✅ Locked In

---

### 7.3 Event Dashboard (Don's Mobile View)

**Real-Time Command Center**

```
┌─────────────────────────────────────┐
│  🔴 LIVE - 8:23 PM                  │
│  NOW PLAYING: DJ Bomshel            │
│  NEXT UP: [OPEN SLOT] - 8:45 PM    │
└─────────────────────────────────────┘

CURRENT METRICS:
👥 Attendance: 🟢 Good (60-75 people)
💰 Bar Sales: 🟢 Strong
🎵 Vibe: 🔥 Fire

EXTENSION DECISION: ✅ RECOMMEND EXTEND

[UPDATE METRICS] [VIEW FULL SCHEDULE]

QUICK ACTIONS:
• Mark DJ as No-Show
• Add Walk-In DJ
• Send Now Playing Update
• Emergency Contact Venue
```

---

## 8. MOBILE RESPONSIVENESS

**Critical Requirements:**
- All forms must work on mobile (iPhone/Android)
- QR codes must be scannable from printed flyers
- Event dashboard must be accessible from Don's phone
- Public schedule must render on mobile browsers
- SMS links must deep-link to forms/schedules

**Testing Checklist:**
- [ ] Booking form works on iPhone Safari
- [ ] Booking form works on Android Chrome
- [ ] QR code scans successfully on both platforms
- [ ] Public schedule loads fast on mobile data
- [ ] Event dashboard quick entry works one-handed
- [ ] All automations trigger correctly from mobile submissions

---

## 9. SHAREABLE LINKS & QR CODES

**Generate 4 Primary Assets:**

**1. DJ Booking Form QR Code**
```
URL: [Airtable Form Link]
Purpose: DJs book their slots
Distribution: Text message, Instagram story, flyers
```

**2. Public Schedule QR Code**
```
URL: [Airtable Public Grid View]
Purpose: Anyone can see who's playing when
Distribution: Posted at venue, Instagram bio, website
```

**3. Donation Link QR Code**
```
URL: [JCCI Donation Page]
Purpose: Direct donations to Jamaica relief
Distribution: Posted at venue, on schedule, in emails
```

**4. Event Metrics Quick Entry QR Code**
```
URL: [Airtable Quick Entry Form]
Purpose: Don/staff update attendance/vibe in real-time
Distribution: Printed card for Don, shared with Daniel
```

---

## 10. SAMPLE DATA STRUCTURE

**Example Record in DJ_Bookings:**
```json
{
  "Booking_ID": 001,
  "DJ_Name": "DJ Smoky",
  "Phone": "(510) 555-0123",
  "Email": "djsmoky@example.com",
  "Preferred_Slot": "4:30-5:15 PM",
  "Backup_Slot": "5:15-5:45 PM",
  "Music_Style": ["Dancehall", "Afrobeats"],
  "Social_Media": "@djsmoky",
  "Equipment_Needs": "None - bringing laptop and controller",
  "Referral_Source": "Text from Don",
  "Status": "Confirmed",
  "Booking_Timestamp": "2025-11-20 10:15:00",
  "Confirmation_Sent": true,
  "Reminded_48hr": false,
  "Reminded_24hr": false,
  "Reminded_4hr": false,
  "Notes": "Requested early slot, confirmed via text"
}
```

**Example Record in Time_Slots:**
```json
{
  "Slot_ID": 02,
  "Time_Slot": "4:30-5:15 PM",
  "Start_Time": "16:30",
  "End_Time": "17:15",
  "Duration_Minutes": 45,
  "Energy_Level": "Early Warm Up",
  "Assigned_DJ": [001],
  "Status": "Booked",
  "Display_Order": 2
}
```

**Example Record in Event_Metrics:**
```json
{
  "Entry_ID": 012,
  "Timestamp": "2025-11-22 20:30:00",
  "Current_Time_Slot": [08],
  "Current_DJ": [003],
  "Attendance_Level": "Good",
  "Bar_Sales_Pace": "Strong",
  "Vibe_Check": "Fire",
  "Notes": "Dance floor packed, people buying rounds",
  "Submitted_By": "Don"
}
```

---

## 11. SUCCESS CRITERIA

**Immediate (Day of Event):**
- [ ] 8+ DJ slots filled before event starts
- [ ] Zero double-bookings or conflicts
- [ ] All confirmed DJs receive 48hr reminder
- [ ] Public schedule accessible via QR code at venue
- [ ] Event metrics captured every 30 minutes
- [ ] Extension decision made by 10pm based on data

**Short-term (Week After Event):**
- [ ] Post-event analytics report generated
- [ ] All DJs receive thank-you email with impact report
- [ ] No-show rate documented for future planning
- [ ] Best-performing time slots identified
- [ ] Total funds raised for Jamaica calculated and reported

**Long-term (Future Events):**
- [ ] System reusable for future JCCI events
- [ ] Historical data informs better scheduling
- [ ] DJ database built for future outreach
- [ ] Automated workflows reduce Don's manual work by 80%

---

## 12. LAUNCH TIMELINE

**Phase 1: Setup (Day 1-2)**
- Create Airtable base with all tables
- Configure fields and relationships
- Build booking form
- Create public schedule view
- Test all views on mobile

**Phase 2: Automations (Day 2-3)**
- Set up email confirmations
- Configure SMS reminders (Twilio)
- Test automation workflows end-to-end
- Create event metrics quick entry form

**Phase 3: Assets & Distribution (Day 3-4)**
- Generate QR codes for all forms
- Create shareable link message templates
- Design printable schedule for venue
- Prepare Instagram story graphics

**Phase 4: DJ Outreach (Day 4-5)**
- Send booking links to confirmed DJs
- Send booking links to backup DJ list
- Post public schedule on social media
- Print QR codes for venue distribution

**Phase 5: Event Day (Day 5)**
- Monitor bookings in real-time
- Update metrics every 30 minutes
- Make extension decision by 10pm
- Capture final attendance/revenue data

**Phase 6: Post-Event (Day 6-7)**
- Generate analytics report
- Send thank-you emails to all DJs
- Document lessons learned
- Archive event data for future reference

---

## 13. BUDGET & RESOURCES

**Airtable Costs:**
- Free Plan: ✅ Sufficient for single event (up to 1,200 records)
- Pro Plan ($20/user/month): Recommended for automations and extended storage
- Enterprise Plan: Not necessary

**Integration Costs:**
- Twilio SMS: ~$0.0075/SMS (estimated $5 total for all reminders)
- Zapier/Make: Free tier sufficient (5 automations)
- SendGrid: Free tier (100 emails/day)
- QR Code Generator: Free

**Total Estimated Cost: $25-30 for single event**

**Time Investment:**
- Initial setup: 6-8 hours
- Testing: 2-3 hours
- Day-of monitoring: 2-3 hours
- Post-event reporting: 1-2 hours

**Total Time: 11-16 hours**

---

## 14. RISK MITIGATION

**Risk 1: DJs don't use the booking system**
- **Mitigation:** Don manually enters bookings from text confirmations into Airtable
- **Backup:** Keep hybrid system (text + Airtable) for first event

**Risk 2: Internet/mobile data issues at venue**
- **Mitigation:** Print backup schedule, pre-download all forms offline
- **Backup:** Have paper sign-up sheet for walk-in DJs

**Risk 3: Airtable automations fail**
- **Mitigation:** Manual confirmation texts as backup
- **Backup:** Don gets instant mobile notifications for all bookings

**Risk 4: No-shows create dead air time**
- **Mitigation:** Always have 2-3 walk-in DJs on standby
- **Backup:** Extended Spotify playlist ready to fill gaps

**Risk 5: Overwhelming walk-in demand**
- **Mitigation:** Waitlist system in Airtable
- **Backup:** Extend event past 11pm if vibes are strong

---

## 15. FUTURE ENHANCEMENTS (Post-Event)

**Version 2.0 Features:**
- **DJ Ratings:** Attendees can rate each DJ's set via QR code
- **Auto-Promotion:** System auto-posts "Now Playing" to Instagram
- **Donation Tracking:** Link specific donations to specific DJ sets
- **DJ Profiles:** Build portfolio system for returning DJs
- **Multi-Event Calendar:** Expand to all JCCI events (BuckJam, etc.)
- **Attendee Check-In:** QR code attendance tracking for mailing list
- **Sponsor Dashboard:** Real-time visibility for event sponsors
- **Live Streaming:** Integrate with Instagram Live/YouTube for diaspora viewers

---

## 16. APPENDIX

### 16.1 Sample Text Messages

**Initial Outreach:**
```
Yo [DJ NAME], Don from JCCI. We're doing One Love Jamaica Relief Nov 22 at Mad Oak. 100% volunteer for Hurricane Melissa victims. Can you book a 30-45min slot? 👉 [BOOKING LINK] First come first served. One Love 🇯🇲
```

**Booking Confirmation:**
```
🙏🏾 Confirmed! You're playing [TIME] on Nov 22 at Mad Oak for Jamaica Relief. Check your email for full details. See you there bro! - Don | JCCI
```

**24hr Reminder:**
```
Tomorrow! [DJ NAME] you're on at [TIME] at Mad Oak (135 12th St Oakland). Arrive 15min early. Bring USB/laptop. This is for Jamaica 🇯🇲 - Don
```

**Day-Of Urgent:**
```
[DJ NAME] you're up in 4 hours! [TIME] at Mad Oak. Current lineup looking 🔥 Can't wait. See you soon! - Don
```

**No-Show Follow-Up:**
```
Hey [DJ NAME], missed you yesterday. Hope everything ok? We had a great turnout and raised [$$] for Jamaica. Let's connect for next event. One Love - Don
```

### 16.2 Sample Emails

**Booking Confirmation Email:**
```
Subject: ✅ You're Confirmed - One Love Jamaica Relief | Nov 22

Dear [DJ NAME],

Thank you for stepping up to support Hurricane Melissa Relief! Your slot is confirmed:

━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 DATE: Friday, November 22, 2025
⏰ YOUR SET: [TIME SLOT] ([DURATION] minutes)
📍 VENUE: Mad Oak Bar, 135 12th St, Oakland, CA
🎵 VIBE: [ENERGY LEVEL]
━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT TO BRING:
✓ USB drive or laptop with your music
✓ Your best vibes and energy
✓ Arrive 15 minutes before your set

YOUR LINEUP:
Before you: [PREVIOUS DJ or "Spotify Warm-Up"]
After you: [NEXT DJ or "TBA - could be you if vibes are strong!"]

WHY THIS MATTERS:
Hurricane Melissa displaced 400,000+ Jamaicans. Right now, entire communities have no power, no internet, no way to reach loved ones. JCCI is coordinating direct relief:
• Starlink terminals to restore communication
• Solar power stations for electricity
• Emergency supplies to affected parishes

100% of funds raised go directly to Jamaica. No overhead. No middlemen. Diaspora helping homeland.

VIEW FULL SCHEDULE:
👉 [PUBLIC SCHEDULE LINK]

SHARE & PROMOTE:
Help us spread the word! Share this event:
📸 Instagram: [EVENT PAGE]
👥 Facebook: [EVENT PAGE]
💬 WhatsApp: Forward this message

QUESTIONS?
Text/call Don: (650) 704-8404
Email: don@jccint.org

You'll receive reminders 48 hours and 24 hours before the event.

From one Jamaican to another - thank you for showing up.

One Love,
Don McLeod
Jamaica Community Center International (JCCI)

P.S. If anything changes and you can't make it, please let us know ASAP so we can fill your slot. Every 30 minutes matters!

━━━━━━━━━━━━━━━━━━━━━━━━━━
🇯🇲 A Beacon of Hope for All Jamaicans
www.jccint.org | IG: @jccint
```

---

## 17. CONCLUSION

This Airtable system transforms One Love Jamaica Relief from a manually coordinated event into a data-driven, professionally managed fundraiser. By enabling DJ self-service booking, real-time schedule visibility, automated reminders, and data-driven extension decisions, we maximize both operational efficiency and fundraising impact.

**Key Benefits:**
- ✅ Reduces Don's coordination time by 80%
- ✅ Eliminates double-bookings and confusion
- ✅ Provides transparency to all stakeholders
- ✅ Enables data-driven decisions (extend event or not)
- ✅ Creates reusable system for future JCCI events
- ✅ Captures analytics for continuous improvement

**Next Steps:**
1. Approve PRD
2. Create Airtable base (6-8 hours)
3. Test with sample data (2-3 hours)
4. Send booking links to DJs (Day 4)
5. Monitor and optimize day-of-event (Day 5)
6. Generate post-event report (Day 6)

---

**Document Owner:** Don McLeod, JCCI  
**Technical Implementation:** [Assign to technical coordinator or Don]  
**Review Date:** November 21, 2025  
**Event Date:** November 22, 2025

---

*One Love. One Jamaica. One Mission.* 🇯🇲
