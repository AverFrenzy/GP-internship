import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form' ;

import { usePartyContext } from '../contexts/PartyContext';
import RatingStarSVG from '../svg/RatingStarSVG';
import DeleteRatingButtonSVG from '../svg/DeleteRatingButtonSVG';
import './index.css';
import PlusSVG from '../svg/PlusSVG';


export const FeedbackWindow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { partyInfo, addFeedBack, chooseRating, deleteFeedback, extraFields, addInput } = usePartyContext();
  const guest = partyInfo.find(guest => +id === guest.id);
  const {
    register,
    formState: {
      errors,
      isValid
    },
    setError,
    clearErrors,
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      phoneNumber: guest?.phoneNumber,
      rating: guest?.feedbackRating ? guest?.feedbackRating : '3',
      feedbackComment: guest?.feedbackComment
    }
  });

  const onSubmit = (data) => {
    addFeedBack(guest, data);
    navigate('/');
  };

  return (
    <form className='feedback-form' data-testid='feedback-form' onSubmit={ handleSubmit(onSubmit) }>
      <div className='name-wrapper'>
        <div className='add-input-btn' data-testid='add-input-btn' onClick={ addInput }>
          <PlusSVG />
        </div>
        <span className='name-input' data-testid='name-input'>{ ` ${ guest?.name }'s feedback ` }
          { guest?.isAddedFeedback &&
            <div onClick={ () => deleteFeedback(guest, reset, navigate) } className='delete-rating-button'>
              <DeleteRatingButtonSVG />
            </div> }
        </span>
      </div>
      <div className='form-item' data-testid='form-item'>
        { !!extraFields.length && extraFields }
        <label htmlFor='form-phone-label' className='rating-label'>Phone number</label>
        <input id='form-phone-label' className='input-phone' disabled={ guest?.isAddedFeedback } autoComplete='off'
               placeholder='Enter your phone number'
               { ...register('phoneNumber', {
                 required: 'Phone number is required',
                 minLength: {
                   value: 3,
                   message: 'Your phone number must have at least 3 chars'
                 },
                 maxLength: {
                   value: 10,
                   message: 'Your phone number can\'t contain more than 10 chars'
                 },
                 onChange: () => {
                   const re = /^[+0-9][- +()0-9]*$/;
                   if (!re.test(getValues('phoneNumber'))) {
                     setError('phoneNumber', {
                         type: 'invalid number',
                         message: 'Telephone number can\'t contain letters',
                       },
                       { shouldFocus: true }
                     );
                     setValue('phoneNumber', getValues('phoneNumber').slice(0, -1));
                   } else {
                     clearErrors('phoneNumber');
                   }
                 },
               }) }
        />
        { errors?.phoneNumber && <div className='error-message'>{ errors?.phoneNumber?.message }</div> }
      </div>
      <div className='form-item' data-testid='form-item'>
        <div className='rating-wrapper'>
          { [...Array(5)].map((star, index) => {
            return (
              <label key={ index + 'ratingLabel' }>
                <input key={ index + 'ratingInput' } type='radio' className='rating-item'
                       disabled={ guest?.isAddedFeedback }
                       value={ index + 1 } { ...register('rating', {
                  onChange: (event) => {
                    chooseRating(event, guest);
                  }
                }) } />
                <RatingStarSVG
                  starColor={ (guest?.feedbackRating || guest?.preRating) >= index + 1 ? 'yellow-fill' : 'white-fill' }
                  key={ index + 'ratingStar' } />
              </label>
            );
          }) }
        </div>
      </div>
      <div className='form-item' data-testid='form-item'>
        <label htmlFor='form-comment-label' className='rating-label'>Comment</label>
        <textarea id='form-comment-label' className='comment-text'
                  placeholder='Leave your comment'
                  disabled={ guest?.isAddedFeedback } { ...register('feedbackComment') } />
      </div>
      { !guest?.isAddedFeedback &&
        (isValid ? <input className='rating-button' type='submit' value='Submit' />
          : <button className='rating-button' data-testid='cancel-btn' onClick={ () => navigate('/') }>Cancel</button>) }
    </form>
  );
};
