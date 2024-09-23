const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('./models/course');
const Enrollment = require('./models/enrollment');
const Student = require('./models/student');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/guvi-zen';

// Function to seed the database
const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected for seeding.');

        // Clear existing data
        await Enrollment.deleteMany();
        await Course.deleteMany();
        await Student.deleteMany();

        // Seed data
        const courses = [
            { title: 'JavaScript Basics', duration: '4 weeks' },
            { title: 'Advanced Node.js', duration: '6 weeks' },
            { title: 'React for Beginners', duration: '5 weeks' }
        ];

        const students = [
            { name: 'Alice Johnson', email: 'alice@example.com' },
            { name: 'Bob Smith', email: 'bob@example.com' }
        ];

        const createdCourses = await Course.insertMany(courses);
        const createdStudents = await Student.insertMany(students);

        const enrollments = [
            { studentId: createdStudents[0]._id, courseId: createdCourses[0]._id },
            { studentId: createdStudents[1]._id, courseId: createdCourses[1]._id }
        ];

        await Enrollment.insertMany(enrollments);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
};

// Call the seeding function
seedDatabase();
