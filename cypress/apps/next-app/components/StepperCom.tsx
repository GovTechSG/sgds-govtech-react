"use client"
import { Stepper, useStep } from "@govtechsg/sgds-react";

const StepperCom = () => {
    const stepMethods = useStep([{
        component: 'ComponentOne',
        title: 'Personal Details',
        stepHeader: 'Personal Details'
    }, {
        component: 'ComponentTwo',
        title: 'Address and Contact Information',
        stepHeader: 'Address and Contact Information'
    }, {
        component: 'ComponentThree',
        title: 'Create project',
        stepHeader: 'Review'
    }]);
    return <Stepper methods={stepMethods} />;
}

export default StepperCom;
