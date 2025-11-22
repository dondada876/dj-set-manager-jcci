# DJ Set Manager - Quick Start Guide
## One Love Jamaica Relief | Nov 22, 2025

**Base**: `appWmtXSMrDKo5e8A` | **Omni**: Enabled ✅

---

## 🚀 GETTING STARTED (3 Steps)

### Step 1: Create Tables in Airtable (15 minutes)

Open your base: https://airtable.com/appWmtXSMrDKo5e8A

Create these 4 tables:

1. **DJ_Bookings** - All DJ booking requests
2. **Time_Slots** - 12 time slots from 3pm-11pm
3. **Event_Metrics** - Real-time tracking during event
4. **Event_Settings** - Master event config

**Field details in**: [DJ_MANAGER_COMPLETE_GUIDE.md](DJ_MANAGER_COMPLETE_GUIDE.md)

---

### Step 2: Run Setup Script (2 minutes)

```bash
cd /Users/dbucknor/don1_automation/airtable-setup
node dj-manager-setup.js
```

This will:
- Populate all 12 time slots (3pm-11pm)
- Add pre-confirmed DJs (Jae5, Smoky, Bomshel, etc.)
- Set event details

---

### Step 3: Configure Views & Permissions (10 minutes)

#### For Each User Role:

| Role | What to Do |
|------|-----------|
| **Promoter (You)** | Already have full access as owner |
| **Venue Owner (Daniel)** | Share > Invite > Set as "Editor" on Event_Metrics only |
| **DJs** | Create Form view on DJ_Bookings > Share link |
| **Public** | Share Time_Slots view publicly (read-only) |
| **Unconfirmed DJs** | Duplicate DJ form > Rename "Waitlist" |

---

## 📱 5 USER ROLES EXPLAINED

### 1. **Promoter (Don)** - Owner
**Access**: Everything
**Primary Job**: Manage bookings, send reminders, make decisions

**Views**:
- Admin - Full Schedule
- Admin - DJ Roster
- Event Dashboard

---

### 2. **Club Venue Owner (Daniel)** - Editor
**Access**: Event Metrics + Public Schedule
**Primary Job**: Track attendance/sales, decide on event extension

**Views**:
- Venue Owner Dashboard (shows extension recommendation)
- Event Metrics Quick Entry Form
- Public Schedule (read-only)

**How to Set Up**:
```
1. Click "Share" button in Airtable
2. Invite Daniel's email
3. Set permissions:
   - Event_Metrics: Editor (can add/edit)
   - Time_Slots: Commenter (read-only)
   - DJ_Bookings: No access
   - Event_Settings: Commenter (read-only)
```

---

### 3. **DJs/Selectors** - Form Only
**Access**: Booking form link only (no base access)
**Primary Job**: Book their time slot

**What They Get**:
- Shareable form link
- Confirmation email
- 48hr, 24hr, 4hr reminders
- Post-event thank you

**How to Set Up**:
```
1. Create Form view on DJ_Bookings table
2. Click "Share form" > Get shareable link
3. Send via text: "Book your slot 👉 [LINK]"
```

**Text Template**:
```
Yo [DJ Name], Don from JCCI. We're doing One Love Jamaica Relief Nov 22 at Mad Oak. 100% volunteer for Hurricane Melissa victims. Can you book a 30-45min slot? 👉 [FORM LINK] First come first served. One Love 🇯🇲
```

---

### 4. **Public Patrons** - Read-Only
**Access**: Public schedule link (no login)
**Primary Job**: See who's playing when

**What They Get**:
- Public schedule showing all time slots and DJs
- Can view on any device
- No personal info visible

**How to Set Up**:
```
1. On Time_Slots table, create view "Public Schedule"
2. Hide sensitive fields (contact info, notes)
3. Click "Share view" > "Create shareable link"
4. Toggle ON "Create a shareable link"
5. Toggle OFF "Restrict access to users with link" (make public)
6. Copy link
```

**Where to Share**:
- Instagram bio
- JCCI website
- Posted at venue entrance
- QR code on flyers

---

### 5. **Unconfirmed DJs / Waitlist** - Form Only
**Access**: Separate waitlist form
**Primary Job**: Request to be added if slots are full

**What They Get**:
- Waitlist form link
- Auto-reply: "You're on the waitlist"
- Future event invitations

**How to Set Up**:
```
1. Duplicate the DJ booking form
2. Rename: "Waitlist - Request a Slot"
3. Add hidden field: Status = "Waitlist"
4. Change confirmation message:
   "Thanks! You're on the waitlist. We'll reach out if a slot opens."
5. Get separate shareable link
```

---

## 🎯 DECISION MATRIX FOR EVENT EXTENSION

At **10:00 PM**, check the latest Event_Metrics entry.

**Extend to 12 AM if**:
- ✅ Attendance: Good/Packed (50+ people)
- ✅ Bar Sales: Strong/Very Strong
- ✅ Vibe: Hot/Fire 🔥

**Close at 11 PM if**:
- ❌ Attendance: Light/Moderate (<50)
- ❌ Bar Sales: Slow/Steady
- ❌ Vibe: Dead/Warming Up

**Formula does this automatically** - just look at "Extension Recommended" field.

---

## 📊 EVENT DAY CHECKLIST

### Morning (9 AM):
- [ ] Check Admin - Full Schedule
- [ ] Text all confirmed DJs
- [ ] Print public schedule for venue
- [ ] Test metrics quick entry form
- [ ] Prepare backup playlist

### During (3 PM - 11 PM):
- [ ] Update metrics every 30 minutes
- [ ] Monitor DJ transitions
- [ ] Fill walk-in slots
- [ ] Post Instagram updates

### Decision Point (10 PM):
- [ ] Review metrics
- [ ] Consult Daniel
- [ ] Announce extension or last call

### After (11 PM+):
- [ ] Mark all DJs as completed
- [ ] Enter final attendance/revenue
- [ ] Send thank you emails
- [ ] Export data for report

---

## 🔗 IMPORTANT LINKS

**Your Base**: https://airtable.com/appWmtXSMrDKo5e8A

**Existing Form**: https://airtable.com/appWmtXSMrDKo5e8A/pagQY3XqJnm8PwJPa/form

**Documentation**:
- [DJ_MANAGER_COMPLETE_GUIDE.md](DJ_MANAGER_COMPLETE_GUIDE.md) - Full setup guide
- [DJSet_ASE_JCCI_DJ_Set](DJSet_ASE_JCCI_DJ_Set) - Original PRD
- [DJSet_ASE_JCCI_List_Table](DJSet_ASE_JCCI_List_Table) - Event schedule

**Scripts**:
- `dj-manager-setup.js` - Populate tables with data

---

## 💡 QUICK TIPS

### For Inviting Daniel (Venue Owner):
1. Share button > Invite by email
2. Set permission: "Editor" on Event_Metrics
3. Set permission: "Commenter" on Time_Slots
4. He gets email invite to access only his dashboard

### For DJ Form Link:
- Form links work without login
- DJs just fill out and submit
- They receive auto-confirmation email
- You get notification of new booking

### For Public Schedule:
- Anyone can view (no login)
- Updates automatically when you add DJs
- Can embed on website
- Generate QR code for easy access

### For Metrics Entry:
- Create simple form on Event_Metrics table
- Bookmark on your phone
- Takes 30 seconds to update
- Formula calculates extension recommendation

---

## 🆘 NEED HELP?

**Common Issues**:

**"DJ can't access form"**
→ Make sure form link is public (not restricted)

**"Daniel can't edit metrics"**
→ Check his permissions on Event_Metrics table

**"Public schedule showing contact info"**
→ Hide sensitive fields in view settings

**"Formula not working"**
→ Check field names match exactly

**"Automations not sending"**
→ Airtable Pro plan required for automations

---

## 📈 SUCCESS METRICS

**What to Track**:
- Total DJ bookings: Target 10+
- No-show rate: Target <20%
- Extension decision: Data-driven ✅
- Funds raised: Document for JCCI
- System reusability: For future events ✅

---

## 🎵 YOU'RE READY!

Once tables are created and script runs, you'll have:

✅ 12 pre-populated time slots
✅ Pre-confirmed DJs added
✅ 5 different access levels ready to configure
✅ Event metrics tracking ready
✅ Extension decision formula working

**Time to Setup**: 30-45 minutes total
**Time Saved on Event Day**: Hours of coordination 🎯

---

**One Love. One Jamaica. One Mission.** 🇯🇲

*Questions? Text Don: (650) 704-8404*
