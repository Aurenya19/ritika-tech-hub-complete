const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @route   POST /api/certificates/generate
// @desc    Generate certificate for completed course
// @access  Private
router.post('/generate', protect, async (req, res) => {
    try {
        const { courseId, courseName } = req.body;
        
        const user = await User.findById(req.user.id);
        
        // Check if certificate already exists
        const existingCert = user.certificates.find(c => c.courseId === courseId);
        if (existingCert) {
            return res.json({
                success: true,
                message: 'Certificate already exists',
                certificate: existingCert
            });
        }
        
        // Generate certificate ID
        const certificateId = `CERT-${Date.now()}-${user._id.toString().slice(-6)}`;
        
        // Create PDF certificate
        const doc = new PDFDocument({
            size: 'A4',
            layout: 'landscape',
            margin: 50
        });
        
        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=certificate-${certificateId}.pdf`);
        
        // Pipe PDF to response
        doc.pipe(res);
        
        // Certificate Design
        // Border
        doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
           .lineWidth(3)
           .strokeColor('#6366f1')
           .stroke();
        
        doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60)
           .lineWidth(1)
           .strokeColor('#8b5cf6')
           .stroke();
        
        // Header
        doc.fontSize(40)
           .fillColor('#6366f1')
           .font('Helvetica-Bold')
           .text('Certificate of Completion', 0, 100, {
               align: 'center'
           });
        
        // Decorative line
        doc.moveTo(200, 160)
           .lineTo(doc.page.width - 200, 160)
           .strokeColor('#8b5cf6')
           .lineWidth(2)
           .stroke();
        
        // Body text
        doc.fontSize(16)
           .fillColor('#1f2937')
           .font('Helvetica')
           .text('This is to certify that', 0, 200, {
               align: 'center'
           });
        
        // User name
        doc.fontSize(32)
           .fillColor('#6366f1')
           .font('Helvetica-Bold')
           .text(user.name, 0, 240, {
               align: 'center'
           });
        
        // Course completion text
        doc.fontSize(16)
           .fillColor('#1f2937')
           .font('Helvetica')
           .text('has successfully completed', 0, 300, {
               align: 'center'
           });
        
        // Course name
        doc.fontSize(24)
           .fillColor('#8b5cf6')
           .font('Helvetica-Bold')
           .text(courseName, 0, 340, {
               align: 'center'
           });
        
        // Date and certificate ID
        const issueDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        doc.fontSize(12)
           .fillColor('#6b7280')
           .font('Helvetica')
           .text(`Date: ${issueDate}`, 0, 420, {
               align: 'center'
           })
           .text(`Certificate ID: ${certificateId}`, 0, 440, {
               align: 'center'
           });
        
        // Signature
        doc.fontSize(14)
           .fillColor('#1f2937')
           .font('Helvetica-Bold')
           .text('Ritika Tech Hub', 0, 500, {
               align: 'center'
           });
        
        doc.fontSize(12)
           .fillColor('#6b7280')
           .font('Helvetica-Oblique')
           .text('Founder & Instructor', 0, 520, {
               align: 'center'
           });
        
        // Finalize PDF
        doc.end();
        
        // Save certificate info to user
        user.certificates.push({
            certificateId,
            courseId,
            courseName,
            issuedAt: new Date(),
            certificateUrl: `/api/certificates/download/${certificateId}`
        });
        
        await user.save();
        
    } catch (error) {
        console.error('Certificate generation error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error generating certificate' 
        });
    }
});

// @route   GET /api/certificates/list
// @desc    Get all user certificates
// @access  Private
router.get('/list', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        res.json({
            success: true,
            certificates: user.certificates
        });
        
    } catch (error) {
        console.error('Get certificates error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

module.exports = router;