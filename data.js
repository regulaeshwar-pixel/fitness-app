const fitnessPlan = {
  weeklyPlan: {
    Monday: {
      workoutType: "Chest + Triceps",
      exercises: [
        { name: "Push-ups", sets: 3, reps: "12-15" },
        { name: "Incline Push-ups", sets: 3, reps: "10-12" },
        { name: "Floor Dumbbell Fly", sets: 3, reps: "12" },
        { name: "Close-grip Push-ups", sets: 3, reps: "8-10" },
        { name: "Overhead DB Triceps Extension", sets: 3, reps: "12" }
      ],
      masaiJumps: null
    },

    Tuesday: {
      workoutType: "Back + Biceps",
      exercises: [
        { name: "Pull-ups / Door Rows", sets: 3, reps: "6-10" },
        { name: "One-arm DB Row", sets: 3, reps: "10 each side" },
        { name: "DB Romanian Deadlift (light)", sets: 2, reps: "12" },
        { name: "DB Curl", sets: 3, reps: "12" },
        { name: "Hammer Curl", sets: 3, reps: "10-12" }
      ],
      masaiJumps: null
    },

    Wednesday: {
      workoutType: "Legs + Abs",
      exercises: [
        { name: "Bodyweight Squats", sets: 3, reps: "15" },
        { name: "Forward Lunges", sets: 3, reps: "10 each side" },
        { name: "Glute Bridges", sets: 3, reps: "12" },
        { name: "Standing Calf Raises", sets: 3, reps: "20" },
        { name: "Plank", sets: 3, reps: "30-45 sec" },
        { name: "Leg Raises", sets: 3, reps: "12" }
      ],
      masaiJumps: { sets: 3, reps: "12-15" }
    },

    Thursday: {
      workoutType: "Chest + Shoulders",
      exercises: [
        { name: "Decline Push-ups", sets: 3, reps: "10" },
        { name: "Wide Push-ups", sets: 3, reps: "12" },
        { name: "Standing DB Shoulder Press", sets: 3, reps: "10" },
        { name: "Lateral Raises", sets: 3, reps: "12-15" },
        { name: "Front Raises", sets: 3, reps: "12" }
      ],
      masaiJumps: null
    },

    Friday: {
      workoutType: "Back + Biceps (Variation)",
      exercises: [
        { name: "Towel Row / Band Pulldown", sets: 3, reps: "12" },
        { name: "DB Reverse Fly", sets: 3, reps: "12" },
        { name: "Superman Hold", sets: 3, reps: "25 sec" },
        { name: "Concentration Curl", sets: 3, reps: "10 each arm" },
        { name: "Reverse Curl", sets: 3, reps: "12" }
      ],
      masaiJumps: null
    },

    Saturday: {
      workoutType: "H & Posture Focus",
      exercises: [
        { name: "Hanging", sets: 5, reps: "30 sec" },
        { name: "Wall Posture Hold", sets: 5, reps: "5 min" },
        { name: "Cobra Stretch", sets: 3, reps: "30 sec" },
        { name: "Cat–Cow", sets: 3, reps: "15 reps" },
        { name: "Child’s Pose", sets: 3, reps: "3 min" }
      ],
      masaiJumps: { sets: 4, reps: "15" }
    },

    Sunday: {
      workoutType: "Rest & Recovery",
      exercises: [],
      masaiJumps: null
    }
  },

  dailyPostureRoutine: [
    { name: "Wall Posture Hold", duration: "3-5 min" },
    { name: "Hanging", sets: 4, duration: "20-30 sec" },
    { name: "Cobra Stretch", sets: 3, duration: "20-30 sec" },
    { name: "Cat–Cow Stretch", reps: "10-15" },
    { name: "Child’s Pose", duration: "2-3 min" }
  ]
};
fitnessPlan.nutritionSchedule = [
  {
    time: "6:00 – 6:45 AM",
    title: "Wake Up & Hydrate",
    details: "1 glass warm water, optional soaked peanuts or almonds"
  },
  {
    time: "7:30 – 8:30 AM",
    title: "Breakfast",
    details: "3 eggs, oatmeal (60g with 250ml milk), 2 bananas, extra milk"
  },
  {
    time: "10:30 – 11:30 AM",
    title: "Mid-Morning Snack",
    details: "Fruit OR roasted peanuts/chana OR small bowl of curd"
  },
  {
    time: "12:00 – 1:30 PM",
    title: "Lunch",
    details: "Rice/rotis, dal/lentils, 100g protein, salad, curd, 1 tsp ghee"
  },
  {
    time: "4:30 – 5:00 PM",
    title: "Pre-Workout Snack",
    details: "Banana + peanuts OR milk + oats OR boiled potatoes"
  },
  {
    time: "6:30 – 7:00 PM",
    title: "Post-Workout",
    details: "Milk OR banana-milk smoothie OR boiled eggs"
  },
  {
    time: "9:00 – 10:00 PM",
    title: "Dinner",
    details: "Rotis/rice, vegetable curry, protein, ghee"
  },
  {
    time: "10:30 PM",
    title: "Before Sleep",
    details: "1 glass warm milk (optional turmeric)"
  }
];
