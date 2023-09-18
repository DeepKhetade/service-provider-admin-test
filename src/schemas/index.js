import * as Yop from "yup";

// export const addUserSchema = Yop.object({
//   role: Yop.string().min(2).max(30).required("required"),
// });


export const addRoleSchema = Yop.object({

  role: Yop.string().min(2, "Role name must be at least 2 character").max(30, "Role name should not exceed 30 characters").required("Role name is required"),

});





export const addUserSchema = Yop.object({
  firstName: Yop.string().required("First name is required "),
  middleName: Yop.string(),
  lastName: Yop.string().required("Last name is required"),

  email: Yop.string().email("Email must be valid").required("Email is required"),

  age: Yop.number().typeError("Age is required").required('Age is required').positive('Age must be valid').integer('Age must be valid').min(10, 'Age must be at least 10').max(200, 'Age must be less than or equal to 200'),

  phoneNumber: Yop.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be valid'),
  gender: Yop.string().required("Gender is required "),

  city: Yop.string().required("City is required"),

  address: Yop.string().required("Address is required"),

  role: Yop.string().required(" Role is required"),

});



export const addAnalyticSchema = Yop.object({

  analyticName: Yop.string().required("required"),

  description: Yop.string().required("required"),

});

export const LoginSchema = Yop.object({

  email: Yop.string().email("Please enter valid email").required("Email is required "),

  password: Yop.string().min(6, "Password must at least 6 character").matches(/^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "Password must contain at least 6 characters, one uppercase, one number and one special case character")

    .required("Password is required"),

});

export const updateRoleSchema = Yop.object({

  role: Yop.string().min(2, "Role name must be at least 2 character").max(30, "Role name should not exceed 30 characters").required("Role Name is required"),

});



export const addAccessSchema = Yop.object({

  accessName: Yop.string().required("Access Name is required!"),

  accessData: Yop.string().required("Access Data is required!"),

  selectAccess: Yop.string().required("Select Access is required!"),

});

export const addUpdateSchema = Yop.object({

  accessName: Yop.string().required("Access Name is required!"),

  accessData: Yop.string().required("Access Data is required!"),

  selectAccess: Yop.string().required("Select Access is required!"),

});



export const updateUserSchema = Yop.object({

  firstName: Yop.string().required("First name is required "),
  middleName: Yop.string(),
  lastName: Yop.string().required("Last name is required"),

  email: Yop.string().email("Email must be valid").required("Email is required"),

  age: Yop.number().required('Age is required').positive('Age must be valid').integer('Age must be valid').min(10, 'Age must be at least 10').max(200, 'Age must be less than or equal to 200'),

  phoneNumber: Yop.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be valid'),
  gender: Yop.string().required("Gender is required "),

  city: Yop.string().required("City is required"),

  address: Yop.string().required("Address is required"),

  role: Yop.string().required(" Role is required"),

});



// for change password



export const changePassword = Yop.object({

  // currentPassword: Yop.string().required("Current Password is required"),

  password: Yop.string().min(6).matches(
    /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Password must contain at least 6 characters, one uppercase, one number and one special case character"

  ).required("Enter new password"),
  confirm_password: Yop.string()

    .required("Confirm new password")
    .oneOf([Yop.ref("password"), null], "Confirm password and New password must be match"),
});

// export const LoginSchema = Yop.object({
//   email: Yop.string().email().required("Email is required "),
//   password: Yop.string()
//     .min(6)
//     .matches(
//       /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
//       "Password must contain at least 6 characters, one uppercase, one number and one special case character"
//     )
//     .required("password is required"),
// });

export const SendResendLinkForgotPassword = Yop.object({
  email: Yop.string().email().required("Email is required "),
});
