import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'
import { useForm } from "react-hook-form";

const Review = () => {
    const [form, setForm] = useState({
        FullName: '',
        Email: '',
        Phone: '',
        Score: 0
    })

    const scores = [0, 1, 2, 3, 4, 5]

    const [sucess, setSuccess] = useState(false)
    const [dataReturn, setDataReturn] = useState({})

    const save = async () => {
        try {
            const response = await fetch('/api/save', {
                method: 'POST',
                body: JSON.stringify(form)
            })

            const data = await response.json()
            setSuccess(true)
            setDataReturn(data)
        }
        catch (err) {
        }
    }

    const onChange = evt => {
        const value = evt.target.value
        const key = evt.target.name

        setForm(old => ({
            ...old, //gets everything from the old form and copies
            [key]: value
        }))
    }

    const { register, handleSubmit, errors } = useForm();

    return (
        <div className='pt-6'>
            <PageTitle title='Reviews' />
            <h1 className='text-2xl text-center font-bold my-4'>Reviews and Suggestions</h1>
            <p className='text-center mb-6'>
                Restaurant X always seeks to better serve its customers. <br />
                This is is why we are always open to hear what you think.
            </p>

            {!sucess &&
                <form className='w-1/5 mx-auto' onSubmit={handleSubmit(save)}>

                    <label className='font-bold'>Full Name:</label>
                    <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='Full Name'
                        onChange={onChange} name='FullName' defaultValue={form.FullName} ref={register({ required: true, minLength: 2 })} />
                    {errors.FullName && 
                        <span className='block italic bold pb-4 text-red-500 text-xs'>
                            This field is required and must have at least 2 characters.
                        </span>
                    }
                    
                    <label className='font-bold'>Email:</label>
                    <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='Email'
                        onChange={onChange} name='Email' defaultValue={form.Email} ref={register({ required: true })} />
                    {errors.Email && 
                        <span className='block italic bold pb-4 text-red-500 text-xs'>
                            This field is required
                        </span>
                    }

                    <label className='font-bold'>Phone:</label>
                    <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='(xxx) xxx-xxxx'
                        onChange={onChange} name='Phone' defaultValue={form.Phone} 
                        ref={register({ required: true, pattern: /^(\(\d{3}\)\s\d{3}\-\d{4})$/ })} />
                    {errors.Phone && 
                        <span className='block italic bold pb-4 text-red-500 text-xs'>
                            The phone must be entered using the following pattern: (xxx) xxx-xxxx
                        </span>
                    }

                    <label className='font-bold'>Score:</label>
                    <div className='flex p-3 w-4/5 shadow bg-blue-100 my-2 rounded'>
                        {scores.map(score => {
                            return (
                                <label key={'score-' + score.toString()} className='block text-center mr-5'>
                                    {score} <br />
                                    <input type='radio' name='Score' value={score} onChange={onChange} ref={register({ required: true })} />
                                </label>
                            )
                        })}
                    </div>
                    {errors.Score  && <span className='block italic bold pb-4 text-red-500 text-xs'>This field is required</span>}

                    <button type='submit' className='m-6 bg-blue-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow'>Save</button>
                </form>
            }

            {sucess &&
                <div className='mb-6 text-center w-1/5 mx-auto bg-blue-100 border-t-2 border-b-2 border-blue-500 text-blue-700'>
                    <p className="font-bold mt-8">Sent!</p>
                    <p className="text-sm mb-8">Thank you for letting us know your opinion!</p>
                    {
                        dataReturn.showCoupon &&
                        <div className='text-center border-dashed border-2 pt-10 pb-10 mb-2'>
                            Your coupon number is: <br />
                            <span className='font-bold text-2xl'>{dataReturn.Coupon}</span>
                        </div>
                    }
                    {
                        dataReturn.showCoupon &&
                        <div className='text-center p-4 mb-6'>
                            Your promo: <br />
                            <span className='font-bold block mb-8'>{dataReturn.Promo}</span>
                            <p className='italic'>Print this screen and show it to one of our waiters.</p>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Review