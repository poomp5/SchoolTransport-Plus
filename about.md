# School Transport Plus

## Elevating School Transit, All in One Place

### Project ID: 7458

School Transport Plus is a data-driven IoT transportation management platform designed to improve school commuting through RFID identification, GPS tracking, real-time notifications, and centralized administration.

Prototype:
https://act.poomp5.com

---

# Introduction

School transportation plays a critical role in helping parents send students to school safely while reducing traffic congestion around campuses.

School Transport Plus was developed to transform traditional school transportation into a smart, measurable, and efficient ecosystem by integrating:

- RFID Student Identification
- Real-Time GPS Tracking
- LINE Notification System
- Centralized Management Dashboard
- Data Analytics & Environmental Monitoring

Our goal is to create a one-stop-service transportation platform that builds trust between schools, parents, and transportation providers.

---

# Problem Statement

Large urban schools face several transportation challenges:

- Peak-hour traffic congestion
- Manual attendance tracking
- Lack of real-time vehicle visibility
- Communication delays between schools and parents
- Excess fuel consumption and carbon emissions

Case Study:

**Assumption College Thonburi**
- More than 4,500 students
- High vehicle density during peak hours
- Significant traffic bottlenecks during drop-off and pick-up periods

---

# Objectives

1. Improve transportation efficiency.
2. Enhance student safety.
3. Provide real-time visibility for parents.
4. Reduce administrative workload.
5. Collect transportation data for decision making.
6. Measure environmental impact through data analytics.

---

# Key Features

## RFID Student Identification

Students tap their RFID cards when boarding the vehicle.

Benefits:

- Accurate attendance recording
- Instant status updates
- Reduced human error

---

## GPS Vehicle Tracking

Real-time location tracking allows:

- Parent monitoring
- Vehicle route visibility
- Accurate arrival estimation

---

## LINE Notifications

Automatic notifications are sent when:

- Student boards vehicle
- Student arrives at school
- Student leaves school
- Student arrives home

---

## Management Dashboard

Administrators can monitor:

- Vehicle locations
- Student status
- Travel logs
- Driver activity
- Historical transportation data

---

## Data Analytics

The system collects:

- Boarding records
- Travel distance
- Vehicle utilization
- Peak-hour transportation trends

This data supports future transportation planning.

---

# Technology Stack

## Frontend

- Next.js

## Backend

- Next.js API Routes
- Server-side Data Processing

## Database

- Neon PostgreSQL
- Prisma ORM

## IoT Hardware

- Arduino UNO R4 WiFi
- RFID Reader Module

---

# System Architecture

```text
Student
   │
RFID Card Tap
   │
Arduino UNO R4 WiFi
(In-Vehicle Unit)
   │
WiFi / Internet
   │
Next.js Backend Server
   │
Database (Neon + Prisma)
   │
 ┌───────────────┬───────────────┐
 │               │               │
Dashboard     LINE Notify     SWIS
 │               │               │
School       Parent        School
Manager      Notification  Information System
```

---

# Research Methodology

## Data Collection

### Transportation Statistics

Reference:

Assumption College Thonburi School Transport Student Statistics

Academic Year 2023–2024

### Survey and Interviews

Participants:

- Students
- Parents
- Transportation Staff
- School Administrators

### Experimental Setup

- RFID-based boarding detection
- GPS tracking system
- Cloud database logging
- Real-time dashboard monitoring

---

# Results

## Data Collection Scale

- 25,200 RFID boarding records
- 20-day traffic observation period
- Multiple-day repeated measurements

---

## System Performance

| Metric | Result |
|----------|----------|
| RFID Accuracy | 99.85% |
| False Positive Rate | 0% |
| Packet Loss Rate | 0.35% |
| System Uptime | 99.2% |

---

## Transportation Efficiency

### Before Deployment

- High congestion
- Large traffic fluctuations
- Long waiting times

### After Deployment

- Stabilized vehicle flow
- Improved transportation visibility
- Better operational planning

---

## Environmental Impact

### Vehicle Reduction

-67.7%

### Congestion Index Reduction

-29.2%

### Daily Vehicle Reduction

880 vehicles/day

### Daily CO₂ Reduction

675.84 kg CO₂/day

### Annual CO₂ Reduction

135.17 tons CO₂/year

---

# Environmental Impact Model

Formula:

```text
ΔCO₂ = ΔVehicles × Distance × Emission Factor
```

Emission Factor:

```text
0.192 kg CO₂ / km
```

Reference:

IPCC Guidelines for National Greenhouse Gas Inventories (2006)

---

# Scalability

School Transport Plus can be adapted for:

- Private Schools
- Public Schools
- Employee Transportation
- Logistics Operations
- Smart City Mobility Systems

---

# Research Questions

### Q1

How can RFID technology improve student attendance tracking during transportation?

### Q2

How can GPS tracking increase visibility and safety for school commuting?

### Q3

Can transportation data reduce traffic congestion and improve efficiency?

### Q4

Can an RFID + GPS transportation framework contribute to carbon emission reduction?

---

# Conclusion

School Transport Plus demonstrates that a data-driven IoT transportation framework can significantly improve school transportation management.

Through RFID identification, GPS tracking, cloud-based analytics, and automated notifications, the system provides:

- Increased student safety
- Improved transportation efficiency
- Reduced administrative workload
- Data-driven operational planning
- Measurable environmental benefits

The project successfully proves the feasibility of transforming school transportation into a smart, scalable, and environmentally sustainable ecosystem.

---

# Developed By

### Poonyapat Goonmanoon

### Nattasit Manapiyawong

---

# Project Advisor

### Phitchaphorn Prayoon-Anutep

---

# Prototype

https://act.poomp5.com

School Transport Plus  
"Transforming School Commuting into a Measurable Environmental System"