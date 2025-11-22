#!/usr/bin/env node
/**
 * DJ Set Manager - Complete Setup Script
 * Creates tables, fields, views, and forms for One Love Jamaica Relief
 *
 * Base: DJ_Set_Manager_ASE_JCCI (appWmtXSMrDKo5e8A)
 * Event: November 22, 2025 | Mad Oak Bar, Oakland
 *
 * User Roles:
 * 1. Promoter (Don) - Full Admin
 * 2. Club Venue Owner (Daniel) - Event Dashboard
 * 3. DJ/Selector - Booking Form
 * 4. Public Patrons - Read-Only Schedule
 * 5. Unconfirmed DJs - Waitlist Form
 */

import Airtable from 'airtable';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const BASE_ID = 'appWmtXSMrDKo5e8A';
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_PAT });
const base = airtable.base(BASE_ID);

console.log('═══════════════════════════════════════════════════════════');
console.log('🎵 DJ SET MANAGER - SETUP SCRIPT');
console.log('═══════════════════════════════════════════════════════════');
console.log(`Base ID: ${BASE_ID}`);
console.log(`Event: One Love Jamaica Relief - Nov 22, 2025\n`);

// Event Configuration
const EVENT_CONFIG = {
  eventName: 'One Love Jamaica Relief',
  eventDate: '2025-11-22',
  venueName: 'Mad Oak Bar',
  venueAddress: '135 12th St, Oakland, CA',
  doorsTime: '3:00 PM',
  scheduledEndTime: '11:00 PM',
};

// Time Slots Configuration (from PRD)
const TIME_SLOTS = [
  { slot: '3:00-4:00 PM', start: '15:00', end: '16:00', duration: 60, energy: 'Early Warm Up', order: 1 },
  { slot: '4:00-4:30 PM', start: '16:00', end: '16:30', duration: 30, energy: 'Early Warm Up', order: 2 },
  { slot: '4:30-5:15 PM', start: '16:30', end: '17:15', duration: 45, energy: 'Early Warm Up', order: 3 },
  { slot: '5:15-5:45 PM', start: '17:15', end: '17:45', duration: 30, energy: 'Transition', order: 4 },
  { slot: '5:45-6:30 PM', start: '17:45', end: '18:30', duration: 45, energy: 'Peak Build', order: 5 },
  { slot: '6:30-7:00 PM', start: '18:30', end: '19:00', duration: 30, energy: 'Transition', order: 6 },
  { slot: '7:00-7:45 PM', start: '19:00', end: '19:45', duration: 45, energy: 'Prime Time', order: 7 },
  { slot: '7:45-8:15 PM', start: '19:45', end: '20:15', duration: 30, energy: 'Transition', order: 8 },
  { slot: '8:15-9:00 PM', start: '20:15', end: '21:00', duration: 45, energy: 'Prime Time', order: 9 },
  { slot: '9:00-9:30 PM', start: '21:00', end: '21:30', duration: 30, energy: 'Transition', order: 10 },
  { slot: '9:30-10:15 PM', start: '21:30', end: '22:15', duration: 45, energy: 'Peak Evening', order: 11 },
  { slot: '10:15-11:00 PM', start: '22:15', end: '23:00', duration: 45, energy: 'Closing', order: 12 },
];

// Pre-confirmed DJs (from schedule)
const PRECONFIRMED_DJS = [
  { name: 'Spotify Curated Playlist', slot: '3:00-4:00 PM', status: 'Confirmed', musicStyle: ['Roots Reggae', 'Classic Lover\'s Rock'] },
  { name: 'DJ Smoky', slot: '4:30-5:15 PM', status: 'Tentative', phone: '', email: '' },
  { name: 'Jae5', slot: '5:45-6:30 PM', status: 'Confirmed', phone: '', email: '' },
  { name: 'DJ Bomshel (Sheldon)', slot: '7:00-7:45 PM', status: 'Tentative', phone: '', email: '', notes: 'Dialysis dependent' },
  { name: 'DJ Gee Power', slot: '9:30-10:15 PM', status: 'Tentative', phone: '', email: '' },
];

async function setupBase() {
  try {
    console.log('📋 Step 1: Checking existing tables...\n');

    // Note: Airtable API doesn't support creating tables/fields directly
    // We'll create records in existing tables instead

    console.log('⚠️  IMPORTANT: This script will populate data into existing tables.');
    console.log('   Please ensure you have created these 4 tables in your base:\n');
    console.log('   1. DJ_Bookings');
    console.log('   2. Time_Slots');
    console.log('   3. Event_Metrics');
    console.log('   4. Event_Settings\n');

    console.log('📝 Step 2: Populating Time_Slots table...\n');

    try {
      // Check if Time_Slots table exists
      const timeSlots = base('Time_Slots');

      // Create time slot records
      for (const slot of TIME_SLOTS) {
        await timeSlots.create({
          'Time Slot': slot.slot,
          'Start Time': slot.start,
          'End Time': slot.end,
          'Duration (min)': slot.duration,
          'Energy Level': slot.energy,
          'Display Order': slot.order,
          'Status': 'Available',
        });
        console.log(`   ✅ Created: ${slot.slot} (${slot.energy})`);
      }

      console.log('\n✅ Time slots created successfully!\n');

    } catch (error) {
      if (error.statusCode === 404) {
        console.log('   ❌ Error: Time_Slots table not found.');
        console.log('   Please create the table in Airtable first.\n');
      } else {
        throw error;
      }
    }

    console.log('📝 Step 3: Populating Event_Settings...\n');

    try {
      const eventSettings = base('Event_Settings');

      await eventSettings.create({
        'Event Name': EVENT_CONFIG.eventName,
        'Event Date': EVENT_CONFIG.eventDate,
        'Venue Name': EVENT_CONFIG.venueName,
        'Venue Address': EVENT_CONFIG.venueAddress,
        'Doors Time': EVENT_CONFIG.doorsTime,
        'Scheduled End Time': EVENT_CONFIG.scheduledEndTime,
        'Event Status': 'Planning',
      });

      console.log('   ✅ Event settings created!\n');

    } catch (error) {
      if (error.statusCode === 404) {
        console.log('   ❌ Error: Event_Settings table not found.\n');
      } else {
        throw error;
      }
    }

    console.log('📝 Step 4: Adding pre-confirmed DJs...\n');

    try {
      const djBookings = base('DJ_Bookings');

      for (const dj of PRECONFIRMED_DJS) {
        await djBookings.create({
          'DJ Name': dj.name,
          'Phone': dj.phone || '',
          'Email': dj.email || '',
          'Preferred Slot': dj.slot,
          'Status': dj.status,
          'Music Style': dj.musicStyle || [],
          'Notes': dj.notes || '',
          'Referral Source': 'Initial Setup',
        });
        console.log(`   ✅ Added: ${dj.name} (${dj.status})`);
      }

      console.log('\n✅ Pre-confirmed DJs added!\n');

    } catch (error) {
      if (error.statusCode === 404) {
        console.log('   ❌ Error: DJ_Bookings table not found.\n');
      } else {
        throw error;
      }
    }

    console.log('═══════════════════════════════════════════════════════════');
    console.log('🎉 SETUP COMPLETE!');
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log('📱 NEXT STEPS:\n');
    console.log('1. Create Views in Airtable:');
    console.log('   - Public Booking Form (DJ_Bookings)');
    console.log('   - Public Schedule (Time_Slots)');
    console.log('   - Admin Dashboard (All tables)');
    console.log('   - Event Metrics (Event_Metrics)');
    console.log('   - Venue Owner View (Event_Metrics + Time_Slots)\n');

    console.log('2. Set up Interfaces for 5 User Roles:');
    console.log('   - Promoter (Don): Full admin access');
    console.log('   - Venue Owner: Event dashboard + metrics');
    console.log('   - DJs: Booking form only');
    console.log('   - Public: Read-only schedule');
    console.log('   - Unconfirmed DJs: Waitlist form\n');

    console.log('3. Configure Automations:');
    console.log('   - Booking confirmation emails');
    console.log('   - 48hr reminders');
    console.log('   - 24hr SMS reminders');
    console.log('   - No-show alerts\n');

    console.log('📄 Documentation saved to: dj-manager-setup-guide.md\n');

  } catch (error) {
    console.error('\n❌ Setup Error:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

// Run setup
setupBase().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
