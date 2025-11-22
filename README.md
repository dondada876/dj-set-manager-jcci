# DJ Set List Manager - JCCI
## One Love Jamaica Relief | November 22, 2025

[![Airtable](https://img.shields.io/badge/Airtable-18BFFF?style=flat&logo=airtable&logoColor=white)](https://airtable.com/appWmtXSMrDKo5e8A)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Event**: Mad Oak Bar, Oakland | 3:00 PM - 11:00 PM+
**Purpose**: Hurricane Melissa Relief Fundraiser
**Organization**: Jamaica Community Center International (JCCI)

---

## 🎯 Project Overview

A comprehensive DJ booking and event management system built on Airtable, designed to:
- Enable **self-service DJ booking** via shareable forms
- Provide **real-time event metrics** for data-driven decisions
- Support **5 different user access levels** (Promoter, Venue Owner, DJs, Public, Waitlist)
- Automate **confirmations, reminders, and analytics**
- Make **data-driven extension decisions** at 10 PM

---

## 📊 System Architecture

### Base ID
`appWmtXSMrDKo5e8A` - DJ_Set_Manager_ASE_JCCI

### Core Tables
1. **DJ_Bookings** - All DJ booking requests and confirmations
2. **Time_Slots** - 12 time slots from 3pm-11pm
3. **Event_Metrics** - Real-time tracking (attendance, bar sales, vibe)
4. **Event_Settings** - Master event configuration

### User Roles & Permissions

| Role | Access Level | Primary Function |
|------|--------------|------------------|
| **Promoter (Don)** | Owner - Full Admin | Manage bookings, send reminders, make decisions |
| **Venue Owner (Daniel)** | Editor - Event Metrics | Track attendance/sales, approve extensions |
| **DJs/Selectors** | Form Link Only | Self-book time slots |
| **Public Patrons** | Read-Only Link | View schedule |
| **Unconfirmed DJs** | Waitlist Form | Request slots when full |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Airtable account with Pro plan (for automations)
- Airtable Personal Access Token (PAT)

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/dj-set-manager-jcci.git
cd dj-set-manager-jcci

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your Airtable credentials
nano .env
```

### Setup

```bash
# Run automated setup script
npm run setup

# This will:
# - Populate all 12 time slots (3pm-11pm)
# - Add pre-confirmed DJs
# - Create event settings
```

---

## 📁 Project Structure

```
dj-set-manager-jcci/
├── docs/                          # Documentation
│   ├── ARCHITECTURE.md            # System architecture
│   ├── API_REFERENCE.md           # Airtable API usage
│   ├── COMPLETE_GUIDE.md          # Full setup guide
│   └── QUICK_START.md             # Quick reference
├── scripts/                       # Automation scripts
│   ├── setup.js                   # Initial base setup
│   ├── populate-slots.js          # Create time slots
│   ├── add-djs.js                 # Add pre-confirmed DJs
│   └── test-api.js                # Test API connection
├── config/                        # Configuration files
│   ├── time-slots.json            # Time slot definitions
│   ├── pre-confirmed-djs.json     # Initial DJ list
│   └── event-config.json          # Event details
├── src/                           # Source code
│   ├── airtable/                  # Airtable integrations
│   │   ├── client.js              # Airtable client wrapper
│   │   ├── dj-bookings.js         # DJ bookings operations
│   │   ├── time-slots.js          # Time slots operations
│   │   ├── event-metrics.js       # Metrics operations
│   │   └── automations.js         # Automation helpers
│   ├── utils/                     # Utility functions
│   │   ├── logger.js              # Logging utility
│   │   ├── validators.js          # Data validators
│   │   └── formatters.js          # Data formatters
│   └── index.js                   # Main entry point
├── tests/                         # Test files
│   ├── setup.test.js
│   ├── api.test.js
│   └── integration.test.js
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies
└── README.md                      # This file
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```bash
# Airtable Configuration
AIRTABLE_PAT=your_personal_access_token_here
DJ_MANAGER_BASE_ID=appWmtXSMrDKo5e8A

# Event Configuration
EVENT_DATE=2025-11-22
VENUE_NAME=Mad Oak Bar
VENUE_ADDRESS=135 12th St, Oakland, CA

# Optional: Twilio for SMS reminders
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# Optional: SendGrid for emails
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM_EMAIL=noreply@jccint.org
```

---

## 📋 Available Scripts

```bash
# Setup & Configuration
npm run setup              # Run initial base setup
npm run test-api           # Test Airtable API connection
npm run populate           # Populate all tables with data

# Development
npm run dev                # Start development server
npm run test               # Run tests
npm run lint               # Lint code

# Event Day Operations
npm run event:start        # Mark event as Active
npm run event:metrics      # Quick metrics entry (CLI)
npm run event:complete     # Mark event as Completed
npm run event:report       # Generate post-event report

# DJ Management
npm run dj:list            # List all confirmed DJs
npm run dj:confirm <id>    # Confirm DJ booking
npm run dj:remind          # Send reminders (48hr/24hr/4hr)

# Analytics
npm run analytics:export   # Export all data to CSV
npm run analytics:report   # Generate analytics report
```

---

## 🎨 User Interfaces

### For Promoter (Don)
**Access**: Full Airtable base access
**Views**:
- Admin - Full Schedule
- Admin - DJ Roster
- Event Dashboard
- All analytics and reporting

### For Venue Owner (Daniel)
**Access**: https://airtable.com/appWmtXSMrDKo5e8A (Editor on Event_Metrics)
**Views**:
- Venue Owner Dashboard
- Event Metrics Quick Entry
- Extension Decision Matrix

### For DJs/Selectors
**Access**: Shareable form link
**Function**: Book time slots, receive confirmations

### For Public Patrons
**Access**: Public read-only schedule link
**Function**: View lineup and event details

### For Unconfirmed DJs
**Access**: Waitlist form link
**Function**: Request slots when event is full

---

## 🤖 Automation Workflows

### Implemented Automations

1. **Booking Confirmation** - Immediate email when DJ books slot
2. **48-Hour Reminder** - Email reminder 2 days before event
3. **24-Hour Reminder** - SMS reminder 1 day before event
4. **4-Hour Day-Of** - Urgent reminder on event day
5. **No-Show Alert** - Notification when DJ doesn't show
6. **Post-Event Thank You** - Automated thank you emails

### Setup Instructions

See [docs/COMPLETE_GUIDE.md](docs/COMPLETE_GUIDE.md#automations) for detailed automation setup.

---

## 📊 Event Day Workflow

### Pre-Event (9 AM)
```bash
npm run event:start
npm run dj:list
npm run dj:remind
```

### During Event (3 PM - 11 PM)
Update metrics every 30 minutes:
```bash
npm run event:metrics
```

Or use the mobile quick entry form.

### Extension Decision (10 PM)
System automatically calculates extension recommendation based on:
- ✅ Attendance: Good/Packed (50+ people)
- ✅ Bar Sales: Strong/Very Strong
- ✅ Vibe: Hot/Fire 🔥

### Post-Event
```bash
npm run event:complete
npm run analytics:report
npm run analytics:export
```

---

## 🔗 Important Links

- **Airtable Base**: https://airtable.com/appWmtXSMrDKo5e8A
- **Existing Form**: https://airtable.com/appWmtXSMrDKo5e8A/pagQY3XqJnm8PwJPa/form
- **JCCI Website**: https://jccint.org
- **Instagram**: [@jccint](https://instagram.com/jccint)

---

## 📚 Documentation

- [**ARCHITECTURE.md**](docs/ARCHITECTURE.md) - System design and data flow
- [**COMPLETE_GUIDE.md**](docs/COMPLETE_GUIDE.md) - Full setup guide with tables, fields, views
- [**QUICK_START.md**](docs/QUICK_START.md) - Quick reference for 5 user roles
- [**API_REFERENCE.md**](docs/API_REFERENCE.md) - Airtable API integration guide

---

## 🐛 Troubleshooting

### Common Issues

**API Connection Fails**
```bash
# Test your API connection
npm run test-api

# Check your .env file has correct AIRTABLE_PAT
```

**Tables Not Found**
Ensure you've created all 4 tables in Airtable first:
1. DJ_Bookings
2. Time_Slots
3. Event_Metrics
4. Event_Settings

**Automations Not Firing**
- Airtable Pro plan required for automations
- Check automation conditions and triggers
- Test with sample data first

---

## 🚦 Roadmap

### Phase 1: MVP (Current)
- [x] Base structure and tables
- [x] Setup automation script
- [x] 5 user access levels
- [ ] Full documentation
- [ ] API integration scripts

### Phase 2: Enhanced Features
- [ ] SMS reminders via Twilio
- [ ] Email automations via SendGrid
- [ ] QR code generation
- [ ] Social media integration
- [ ] Real-time Instagram updates

### Phase 3: Analytics & Reporting
- [ ] Post-event analytics dashboard
- [ ] DJ performance ratings
- [ ] Attendance trend analysis
- [ ] Revenue tracking
- [ ] Multi-event comparison

### Phase 4: Scale & Reuse
- [ ] Multi-event calendar
- [ ] DJ profile database
- [ ] Sponsor dashboard
- [ ] Live streaming integration
- [ ] Ticketing integration

---

## 🤝 Contributing

This is a JCCI internal project for the One Love Jamaica Relief event. For questions or suggestions, contact:

**Don McLeod**
Jamaica Community Center International
📧 don@jccint.org
📱 (650) 704-8404

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

---

## 🇯🇲 About JCCI

**Jamaica Community Center International (JCCI)** is a 501(c)(3) nonprofit organization dedicated to supporting Jamaican communities worldwide through:
- Emergency relief coordination
- Educational programs
- Cultural events and fundraisers
- Community empowerment initiatives

**Hurricane Melissa Relief**: This event raises funds for Starlink terminals, solar power stations, and emergency supplies for 400,000+ displaced Jamaicans.

---

**One Love. One Jamaica. One Mission.** 🇯🇲

---

## 🏷️ Tags

`airtable` `event-management` `dj-booking` `automation` `fundraiser` `jamaica` `nodejs` `javascript` `jcci` `hurricane-relief`
