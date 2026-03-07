
-- Update category constraint to include new categories
ALTER TABLE public.articles DROP CONSTRAINT articles_category_check;
ALTER TABLE public.articles ADD CONSTRAINT articles_category_check CHECK (category = ANY (ARRAY['men', 'women', 'family', 'preventive', 'chronic']));

-- Delete all existing articles
DELETE FROM public.articles;

-- Insert new detailed health guide articles
INSERT INTO public.articles (title, slug, category, excerpt, content, image_url, published) VALUES

('How to Manage a Fever at Home: A Parent''s Guide', 'how-to-manage-fever-at-home', 'family', 
'Learn when a fever is normal, when to worry, and step-by-step home remedies to keep your family comfortable before visiting the clinic.',
'## Understanding Fevers: What Every Parent Should Know

A fever is your body''s natural defense against infection. While it can be scary — especially in children — most fevers are not dangerous and can be managed safely at home. Here''s what our medical team at Optimum Health & Wellness Clinic wants you to know.

## What Temperature Counts as a Fever?

- **Adults**: 100.4°F (38°C) or higher
- **Children**: 100.4°F (38°C) or higher (rectal) or 99.5°F (37.5°C) or higher (oral)
- **Infants under 3 months**: Any temperature of 100.4°F or higher requires immediate medical attention

## Step-by-Step Home Care

### 1. Stay Hydrated
Fever causes your body to lose fluids faster than normal. Drink plenty of water, clear broths, or electrolyte drinks like Pedialyte for children. Avoid sugary sodas and caffeinated drinks.

### 2. Rest Is Essential
Your body needs energy to fight infection. Cancel plans, stay home, and sleep as much as possible. For children, quiet activities like reading or watching a show are fine.

### 3. Use Over-the-Counter Medication Wisely
- **Adults**: Acetaminophen (Tylenol) or ibuprofen (Advil/Motrin) as directed on the label
- **Children**: Use children''s acetaminophen or ibuprofen based on weight, NOT age
- **Never give aspirin to children** under 18 — it can cause a rare but serious condition called Reye''s syndrome

### 4. Keep Cool — But Don''t Overcool
- Dress in lightweight clothing
- Use a light blanket if you have chills
- A lukewarm (NOT cold) bath or damp washcloth on the forehead can help
- **Never** use rubbing alcohol or ice baths — these can be dangerous

### 5. Monitor the Temperature
Check temperature every 4–6 hours. Write it down so you can share the pattern with your doctor if needed.

## When to Come See Us

Visit Optimum Health & Wellness Clinic (open 5pm–10pm, 7 days a week) if:

- Fever lasts more than 3 days in adults or 2 days in children
- Temperature reaches 103°F (39.4°C) or higher
- Fever is accompanied by severe headache, stiff neck, rash, or difficulty breathing
- The person seems confused or unusually irritable
- An infant under 3 months has any fever at all
- Fever keeps coming back after going away

## Common Fever Myths — Debunked

- **"Feed a cold, starve a fever"** — False. You need nutrition and hydration regardless.
- **"Higher fever means sicker"** — Not necessarily. Some minor infections cause high fevers, while serious infections may cause low-grade fevers.
- **"You must bring the fever down"** — Not always. A moderate fever actually helps your immune system fight infection. Focus on comfort.

## What We Can Do for You

At our clinic, we can run rapid tests for flu, COVID, and strep to identify the cause of your fever. We''ll recommend the right treatment and make sure nothing serious is going on. Walk in any evening — no appointment needed.

**Optimum Health & Wellness Clinic** — 3912 N Jackson Rd, Pharr, TX 78577 — Open 5pm–10pm, 7 days a week.',
'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80', true),

('How to Clean and Care for Minor Wounds at Home', 'how-to-clean-minor-wounds-at-home', 'family',
'Cuts, scrapes, and small wounds happen every day. Learn the right way to clean, treat, and bandage minor injuries to prevent infection.',
'## Every Family Needs Basic Wound Care Skills

Whether it''s a kitchen knife slip, a playground scrape, or a minor cut from yard work, knowing how to properly care for a wound at home can prevent infection and speed up healing. Here''s a step-by-step guide from our medical team.

## Step 1: Stop the Bleeding

- Apply gentle pressure with a clean cloth or gauze
- Hold steady pressure for 5–10 minutes — don''t keep peeking
- Elevate the injured area above the heart if possible
- If bleeding doesn''t stop after 15 minutes of firm pressure, come see us

## Step 2: Clean the Wound

- Wash your hands thoroughly with soap and water first
- Rinse the wound under clean, running water for 3–5 minutes
- Use mild soap to clean around (not inside) the wound
- Remove any visible dirt or debris with clean tweezers
- **Do NOT** use hydrogen peroxide, rubbing alcohol, or iodine directly on the wound — these damage healthy tissue and slow healing

## Step 3: Apply an Antibiotic

- Apply a thin layer of over-the-counter antibiotic ointment (like Neosporin or Polysporin)
- This helps prevent infection and keeps the wound moist for faster healing
- If you notice a rash or irritation from the ointment, stop using it

## Step 4: Cover the Wound

- Use a sterile adhesive bandage for small cuts
- For larger wounds, use sterile gauze secured with medical tape
- Change the bandage at least once a day, or whenever it gets wet or dirty
- Keep the wound covered until it has fully closed — this actually speeds up healing

## Step 5: Watch for Signs of Infection

Check the wound daily for these warning signs:

- **Increasing redness** that spreads beyond the wound edges
- **Swelling** that gets worse instead of better
- **Warmth** around the wound
- **Pus or cloudy drainage**
- **Red streaks** leading away from the wound
- **Fever** developing after the injury
- **Increasing pain** instead of gradual improvement

If you notice any of these signs, visit our clinic immediately.

## When to Skip Home Care and Come See Us

Some wounds need professional medical attention:

- Deep cuts that won''t stop bleeding
- Wounds with embedded debris you can''t remove
- Cuts on the face, hands, or over joints
- Animal or human bites
- Puncture wounds (especially from rusty objects)
- Wounds that are gaping open or have jagged edges
- Any wound in a person with diabetes or a weakened immune system

## Your Home First Aid Kit Essentials

Keep these supplies on hand:

- Adhesive bandages (various sizes)
- Sterile gauze pads and rolls
- Medical tape
- Antibiotic ointment
- Clean tweezers
- Disposable gloves
- Saline wound wash
- Acetaminophen or ibuprofen for pain

## We''re Here When You Need Us

Our wound care team at Optimum Health & Wellness Clinic is available every evening from 5pm to 10pm. Walk in for professional wound cleaning, treatment, and dressing — no appointment needed.

**Optimum Health & Wellness Clinic** — 3912 N Jackson Rd, Pharr, TX 78577 — (956) 627-3258',
'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=80', true),

('Signs of Dehydration You Shouldn''t Ignore (Especially in South Texas Heat)', 'signs-of-dehydration-south-texas', 'preventive',
'Living in the Rio Grande Valley means heat is part of life. Learn how to spot dehydration early and what to do before it becomes dangerous.',
'## Dehydration in the RGV: A Serious Summer Risk

Living in Pharr and the Rio Grande Valley, we know what intense heat feels like. Temperatures regularly exceed 100°F from May through September, and dehydration is one of the most common — and preventable — health issues we treat at our clinic.

## What Is Dehydration?

Dehydration happens when your body loses more fluids than you take in. Your body needs water for almost every function: regulating temperature, transporting nutrients, removing waste, and keeping organs working properly.

## Early Warning Signs (Mild Dehydration)

Catch it early and you can usually fix it at home:

- **Thirst** (if you''re thirsty, you''re already mildly dehydrated)
- **Dark yellow urine** — healthy urine should be light yellow or clear
- **Dry mouth and lips**
- **Fatigue or sluggishness**
- **Headache**
- **Dizziness when standing up quickly**
- **Decreased urination** — going less than 4 times a day

## Serious Warning Signs (Seek Medical Help)

Come to our clinic or seek emergency care if you notice:

- **Very dark urine or no urination for 8+ hours**
- **Rapid heartbeat or rapid breathing**
- **Confusion or irritability** (especially in elderly people)
- **Fainting or severe dizziness**
- **Sunken eyes**
- **Skin that doesn''t bounce back** when you pinch it (poor skin turgor)
- **In children: no tears when crying, sunken soft spot on infant''s head, unusually sleepy**

## How to Stay Hydrated in South Texas

### Daily Habits
- Drink at least 8–10 glasses of water daily — more if you work outdoors
- Don''t wait until you''re thirsty to drink
- Carry a reusable water bottle everywhere
- Set phone reminders to drink water every hour

### Smart Food Choices
- Eat water-rich fruits: watermelon, cantaloupe, oranges, grapes
- Include vegetables like cucumbers, lettuce, celery, and tomatoes
- Soups and broths count toward your fluid intake
- Avoid excessive caffeine and alcohol — they increase fluid loss

### Outdoor Work and Exercise Tips
- Drink 16–20 oz of water 1–2 hours before going outside
- Drink 6–8 oz every 15–20 minutes during outdoor activity
- Take shade breaks every 30 minutes in extreme heat
- Wear light-colored, loose-fitting clothing
- Use electrolyte drinks (like Gatorade or Pedialyte) for heavy sweating — water alone may not replace lost salts

### Protecting Vulnerable People
- **Elderly adults**: May not feel thirst as strongly. Offer fluids regularly.
- **Young children**: Monitor closely. Offer water, diluted juice, or popsicles frequently.
- **Outdoor workers**: Employers should provide water stations and shade breaks.
- **People on medications**: Some blood pressure and allergy medications increase dehydration risk — ask your doctor.

## Home Rehydration Tips

For mild dehydration:
- Sip water or an electrolyte drink slowly — don''t gulp
- Avoid ice-cold drinks (room temperature is easier on the stomach)
- Rest in a cool, shaded area
- Apply cool, damp cloths to your neck and forehead

### DIY Rehydration Solution
If you don''t have Pedialyte or Gatorade:
- 1 liter of clean water
- 6 teaspoons of sugar
- Half a teaspoon of salt
- Stir well and sip throughout the day

## When to Visit Our Clinic

If home rehydration isn''t working after 1–2 hours, or if symptoms are getting worse, walk in to Optimum Health & Wellness Clinic. We can assess your hydration level and provide treatment to get you feeling better fast.

**Optimum Health & Wellness Clinic** — Open 5pm–10pm, 7 days a week — 3912 N Jackson Rd, Pharr, TX 78577',
'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80', true),

('Living with Diabetes: Daily Management Tips for the RGV Community', 'diabetes-daily-management-tips', 'chronic',
'Practical, everyday tips for managing Type 2 diabetes — from blood sugar monitoring to meal planning that works with traditional Mexican cuisine.',
'## Managing Diabetes Every Day — You Can Do This

If you or a family member has been diagnosed with Type 2 diabetes, you''re not alone. The Rio Grande Valley has one of the highest diabetes rates in the country. But with the right daily habits, diabetes can be managed effectively. Here''s what our medical team recommends.

## Understanding Your Blood Sugar

### Target Ranges (for most adults with Type 2 diabetes)
- **Before meals (fasting)**: 80–130 mg/dL
- **2 hours after eating**: Less than 180 mg/dL
- **A1C goal**: Less than 7% (your doctor may set a different target)

### How to Check Your Blood Sugar
- Wash your hands with warm water and soap (food residue can give false readings)
- Use the side of your fingertip — it''s less painful than the center
- Keep a written log or use your meter''s memory feature
- Check at the times your doctor recommends (usually morning fasting and after meals)

## Eating Well with Diabetes (Without Giving Up Your Favorite Foods)

You don''t have to eat bland, boring food. Here''s how to enjoy traditional meals while managing blood sugar:

### Smart Swaps
- **Flour tortillas to Corn tortillas** (lower glycemic index, more fiber)
- **White rice to Brown rice or cauliflower rice** (in small portions)
- **Regular soda to Water with lime, sugar-free agua fresca**
- **Fried beans to Whole pinto beans from the pot** (high in fiber, great for blood sugar)
- **Pan dulce to A small portion of fresh fruit** for dessert

### Plate Method (Easy Portion Control)
- **Half your plate**: Non-starchy vegetables (salad, nopales, grilled peppers, broccoli)
- **Quarter your plate**: Lean protein (grilled chicken, fish, beans, eggs)
- **Quarter your plate**: Starchy foods (rice, tortilla, corn, potatoes — small portion)

### Timing Matters
- Eat at regular times every day — skipping meals causes blood sugar spikes later
- Don''t skip breakfast
- Space meals 4–5 hours apart
- Have a small, protein-rich snack if you feel shaky between meals

## Exercise Tips That Actually Work

You don''t need a gym membership. Here are realistic options:

- **Walk for 15–30 minutes after dinner** — this is one of the best things you can do for blood sugar
- Walk around the mall or a local park during cooler hours
- Do household chores vigorously — mopping, gardening, and cleaning all count
- Chair exercises if you have mobility issues
- **Goal**: 150 minutes of moderate activity per week (that''s just 22 minutes a day)

## Foot Care — Don''t Skip This

Diabetes can affect circulation and nerve feeling in your feet. Daily foot care prevents serious problems:

- Check your feet every day for cuts, blisters, redness, or swelling
- Wash feet daily with warm (not hot) water and mild soap
- Dry thoroughly, especially between toes
- Apply moisturizer to tops and bottoms — but NOT between toes
- Wear comfortable, closed-toe shoes — never walk barefoot
- Trim toenails straight across
- See a doctor immediately for any sore that doesn''t heal

## Medication Tips

- Take your medications at the same time every day
- Use a pill organizer or phone alarm as a reminder
- Never skip doses because you feel fine — diabetes often has no symptoms until damage is done
- If you run out of medication, visit our clinic for a refill — don''t wait

## Warning Signs to Watch For

Come see us if you experience:
- Blood sugar consistently above 250 mg/dL or below 70 mg/dL
- Increased thirst and urination that''s new or worsening
- Blurred vision
- Numbness or tingling in hands or feet
- A wound that won''t heal
- Frequent infections
- Unexplained weight loss

## We''re Your Partner in Diabetes Care

At Optimum Health & Wellness Clinic, we provide ongoing chronic condition management for diabetes. We can check your blood sugar, review your medications, adjust treatment plans, and answer your questions — every evening from 5pm to 10pm.

**Optimum Health & Wellness Clinic** — 3912 N Jackson Rd, Pharr, TX 78577 — (956) 627-3258',
'https://images.unsplash.com/photo-1593491034932-840e3adf1b22?w=800&q=80', true),

('Urgent Care vs. Emergency Room: How to Know Where to Go', 'urgent-care-vs-emergency-room', 'family',
'Not sure if you need the ER or an after-hours clinic? This guide helps you make the right call — and could save you hundreds of dollars.',
'## Don''t Overpay for Care You Can Get at Our Clinic

One of the biggest healthcare mistakes families in the RGV make is going to the emergency room for conditions that can be treated at an after-hours clinic like ours — at a fraction of the cost. Here''s how to know where to go.

## Come to Optimum Health and Wellness Clinic For:

These are conditions we treat every day, 5pm–10pm:

- **Cold and flu symptoms** — cough, congestion, sore throat, body aches
- **Minor fevers** — under 103 degrees F in adults
- **Ear infections and earaches**
- **Sinus infections**
- **Urinary tract infections (UTIs)**
- **Minor cuts and scrapes** that may need cleaning and bandaging
- **Minor burns** (small area, no blistering)
- **Rashes and skin irritation**
- **Pink eye (conjunctivitis)**
- **Sprains and minor strains**
- **Nausea, vomiting, or diarrhea** (without severe dehydration)
- **Medication refills** when your regular doctor isn''t available
- **Chronic condition check-ups** — blood pressure, diabetes monitoring

## Go to the Emergency Room For:

These are true emergencies that require ER-level care:

- **Chest pain or pressure** — especially with shortness of breath, arm pain, or jaw pain
- **Signs of stroke** — sudden face drooping, arm weakness, slurred speech (remember FAST)
- **Severe difficulty breathing**
- **Heavy, uncontrollable bleeding**
- **Deep wounds** that expose bone, muscle, or tendons
- **Broken bones** with visible deformity
- **Loss of consciousness or seizures**
- **Severe allergic reactions** (anaphylaxis — throat swelling, can''t breathe)
- **Severe abdominal pain** that''s sudden and intense
- **Head injuries** with confusion, vomiting, or loss of consciousness
- **Poisoning or overdose**
- **High fever in infants** under 3 months old

## The Cost Difference Is Huge

- **Average ER visit in Texas**: $1,500 to $3,000 or more (even for minor issues)
- **Our clinic visit**: Starting at $75 to $135 (depending on the service)
- No insurance needed — transparent cash pricing
- No surprise bills weeks later

## When You Are Not Sure

If you are unsure whether your situation is an emergency, ask yourself:

1. **Is there a risk of losing life, limb, or eyesight?** Go to the ER
2. **Is the person alert, breathing normally, and not in severe pain?** Come to our clinic
3. **Can this wait 30 minutes without getting significantly worse?** Come to our clinic
4. **Would you normally call 911?** Go to the ER

When in doubt, call us at (956) 627-3258 and we can help you decide over the phone.

## Why Choose Our After-Hours Clinic?

- **Open when you need us**: 5pm–10pm, every day of the week
- **No appointment needed**: Walk right in
- **Bilingual staff**: We speak English and Spanish
- **Affordable**: Cash pricing with no hidden fees
- **Fast**: Much shorter wait times than the ER

## Save Our Number

Next time you are wondering should I go to the ER — call us first. We might be able to help you for a fraction of the cost.

**Optimum Health & Wellness Clinic** — (956) 627-3258 — 3912 N Jackson Rd, Pharr, TX 78577 — Open 5pm–10pm daily',
'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80', true),

('Understanding High Blood Pressure: What the Numbers Mean and What You Can Do', 'understanding-high-blood-pressure', 'chronic',
'High blood pressure is called the silent killer because it often has no symptoms. Learn what your numbers mean and simple lifestyle changes that make a big difference.',
'## High Blood Pressure: The Silent Threat

High blood pressure (hypertension) affects nearly half of all adults in the United States, and rates are even higher in the Rio Grande Valley. The dangerous thing about high blood pressure is that most people feel completely fine — until serious damage has already been done to the heart, kidneys, or brain.

## What Do the Numbers Mean?

Blood pressure is measured with two numbers (example: 120/80):

- **Top number (systolic)**: Pressure when your heart beats
- **Bottom number (diastolic)**: Pressure when your heart rests between beats

### Blood Pressure Categories
- **Normal**: Less than 120/80
- **Elevated**: 120 to 129 over less than 80
- **High Blood Pressure Stage 1**: 130 to 139 over 80 to 89
- **High Blood Pressure Stage 2**: 140 or higher over 90 or higher
- **Hypertensive Crisis (seek immediate care)**: 180 or higher over 120 or higher

## Risk Factors Common in Our Community

- **Family history** — if your parents or siblings have it, your risk is higher
- **Diet high in sodium** — many traditional foods are high in salt
- **Being overweight**
- **Physical inactivity**
- **Stress** — chronic stress raises blood pressure over time
- **Diabetes** — often occurs alongside high blood pressure
- **Smoking**
- **Excessive alcohol**

## What High Blood Pressure Does to Your Body

Left untreated, high blood pressure silently damages:

- **Heart**: Makes it work harder, leading to heart disease and heart failure
- **Brain**: Increases risk of stroke
- **Kidneys**: Damages blood vessels in the kidneys, leading to kidney disease
- **Eyes**: Can damage blood vessels in the retina, causing vision loss
- **Arteries**: Causes hardening and narrowing, reducing blood flow everywhere

## Lifestyle Changes That Actually Work

### 1. Reduce Sodium (Salt)
- **Goal**: Less than 2,300 mg per day (about 1 teaspoon of salt)
- Read nutrition labels — canned soups, chips, and processed meats are loaded with sodium
- Cook with fresh herbs, garlic, lime, and chili instead of salt
- Ask for less salt when eating out
- Rinse canned beans and vegetables before using them

### 2. Follow the DASH Diet
The DASH (Dietary Approaches to Stop Hypertension) diet is proven to lower blood pressure:
- Plenty of fruits and vegetables (4 to 5 servings each daily)
- Whole grains
- Lean proteins (chicken, fish, beans)
- Low-fat dairy
- Limit sweets and red meat

### 3. Move Your Body
- 30 minutes of moderate exercise most days (walking counts!)
- Even 10-minute walks after meals help
- Take the stairs, park farther away, play with your kids outside

### 4. Manage Stress
- Deep breathing exercises: Inhale for 4 counts, hold for 4, exhale for 4
- Limit screen time before bed
- Spend time with family and friends
- Consider prayer, meditation, or journaling

### 5. Limit Alcohol and Quit Smoking
- Men: No more than 2 drinks per day
- Women: No more than 1 drink per day
- Smoking raises blood pressure immediately and damages blood vessels long-term

## Take Your Medication

If your doctor has prescribed blood pressure medication:

- Take it every day at the same time — even if you feel fine
- Don''t stop taking it because your numbers improved (that means it''s working!)
- Never double up if you miss a dose
- If you are experiencing side effects, talk to your doctor before stopping
- Need a refill? Walk into our clinic — we can help

## Monitor at Home

- Buy a home blood pressure monitor (available at most pharmacies for $25 to $50)
- Check at the same time each day, sitting quietly for 5 minutes first
- Keep a log to share with your doctor
- Don''t check right after exercise, caffeine, or a stressful event

## When to Seek Immediate Care

- Blood pressure reading of 180/120 or higher
- Severe headache with no known cause
- Chest pain or shortness of breath
- Vision changes
- Difficulty speaking or weakness on one side

## We Can Help You Manage It

At Optimum Health & Wellness Clinic, we provide chronic condition management for high blood pressure. We can check your numbers, review your medications, and create a plan that works for your lifestyle. Walk in any evening, 5pm–10pm.

**Optimum Health & Wellness Clinic** — 3912 N Jackson Rd, Pharr, TX 78577 — (956) 627-3258',
'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', true);
