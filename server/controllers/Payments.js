const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender"); 

// capture the payment and initiate razorpay order
exports.capturePayment = async (req, res) => {
    //get courseId and UserID
    const {course_id} = req.body;
    const userId = req.user.id;
    //validation
    //valid courseID
    try{
        if(!course_id){
            return res.status(401).json({
                success:false,
                message:"Please provide valid courseid",
            })
        }

        let course;
        // console.log("courseid=",course_id);
        try{
            course = await Course.findById(course_id);
            if(!course) {
                return res.json({
                    success:false,
                    message:'Could not find the course',
                });
            }
    
            //user already pay for the same course
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success:false,
                    message:'Student is already enrolled',
                });
            }
        }
        catch(error) {
            console.error(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
        // totalAmount += course.price;
    
        // create order
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount : amount *100,
            currency : currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseId:course_id,
                userId,
            }
        };

        try{
            //initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log("payment",paymentResponse);
            // return response

            // return res.status(200).json({
            //     success:true,
            //     orderId: paymentResponse.id,
            //     currency:paymentResponse.currency,
            //     amount:paymentResponse.amount,
            // });
        }
        catch(error) {
            console.error(error);
            return res.status(500).json({
                success:false,
                message:"could not initiate order",
                error:error.message,
            });
        }
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
    
};

// verify the signature of razorpay and server
exports.verifySignature = async (req, res) => {
    try{
        const webhookSecret = "123456789"

        const signature = req.headers("x-razorpay-signature"); 

        const shasum = crypto.createhmac("sha256" , webhookSecret)
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest("hex")

        if(signature === digest){
            console.log("payment authorized")

            const {courseId , userId} = req.body.payload.payment.entity.notes;

            try{
                // fullfil the action

                // find the course and enroll the student in it 
                const enrolledCourse = await Course.findOneAndUpdate(
                      {_id:courseId},
                      {$push:{studentsEnrolled:userId}},
                      {new:true},
                )
                // validation
                if(!enrolledCourse) {
                    return res.status(500).json({
                        success:false,
                        message:"course not found"
                    })
                }
                console.log(enrolledCourse);

                // find the student and course to their enrolled courses array
                const enrolledStudent = await User.findOneAndUpdate(
                    {_id:userId},
                    {$push:{courses:courseId}},
                    {new:true},
                )
                console.log(enrolledStudent)

                // send mail to student for conformation
                const emailResponse = await mailSender(
                             enrolledStudent.email,
                             "Congratulations from MOHD UBAIS",
                             "Conguratulation, you are onboarded into the new Course",

                );
                console.log(emailResponse);
                return res.status(200).json({
                    success:true,
                    message:"Singnature verified and Email sent successfully"
                })
            }
            catch(error){
                return res.status(500).json({
                    success:false,
                    message:"course not found"
                })
            }
        }
        else{
            return res.status(400).json({
                success:false,
                message:"course not found"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}
