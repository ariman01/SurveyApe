import {actionTypes} from "../actions/actionTypes";
import uuidv4 from "uuid";

const survey_data = {
    survey_id:"",
    survey_name: "",
    survey_type:"",
    end_date:"",
    questions:[],
    ispublished:true,
    iseditable:true
};

const survey = (state = survey_data, action)=>
{
    switch (action.type) {
        case actionTypes.CREATE_SURVEY :
            console.log("CREATE_SURVEY reducer", action.data);
            //let new_end_date = action.data.end_date?new Date(action.data.end_date).toISOString().slice(0,10):"";
            //let new_created_date
            return Object.assign({},state,{
                survey_id:action.data.survey_id,
                survey_name:action.data.survey_name,
                survey_type:action.data.survey_type,
                end_date:action.data.end_date,
                create_date:action.create_date,
                questions:action.data.questions,
                ispublished:action.data.ispublished,
                iseditable:action.data.iseditable
            });
        case actionTypes.ADD_QUESTION :
            console.log("ADD_QUESTION reducer",action.question_type);
            let add_questions = state.questions;
            add_questions.push(action.data);
            return Object.assign({},state,{
                questions:add_questions
            });
        case actionTypes.EDIT_QUESTION :
            // action data will pass question index and text to be edited
            console.log("EDIT_QUESTION reducer",action.data);
            let edit_questions = state.questions;
            edit_questions[action.data.question_index].question_text = action.data.question_text;
            return Object.assign({},state, {
                questions: edit_questions
            });

        case actionTypes.ADD_OPTIONS :
            console.log("ADD_OPTIONS reducer",action.data.question_index);
            // action data will pass question index and option text value
            let edit_questions1 = state.questions;
            edit_questions1[action.data.question_index].options.push({
                option_id:uuidv4(),
                option_type:"text",
                option_text:""
            });

            return Object.assign({},state,{
                questions:edit_questions1
            });

        case actionTypes.EDIT_OPTIONS :
            // action data will pass question index, option index and option text value
            console.log("EDIT_QUESTION reducer",action.data);
            let edit_questions2 = state.questions;
            edit_questions2[action.data.question_index].options[action.data.option_index].option_text =action.data.option_text;
            edit_questions2[action.data.question_index].options[action.data.option_index].option_type =action.data.option_type;
            return Object.assign({},state,{
                questions:edit_questions2
            });

        case actionTypes.UPDATE_SURVEY:
            console.log("Update Survey Reducer Action UPDATE_SURVEY ", action.data);
            let new_date = action.data.end_date?action.data.end_date:state.end_date;
            return Object.assign({},state,{
                survey_id:action.data.survey_id,
                survey_name:action.data.survey_name,
                survey_type:action.data.survey_type,
                end_date:new_date,
                create_date:action.create_date,
                questions:action.data.questions,
                iseditable:action.data.iseditable,
                ispublished:action.data.ispublished
            });

        case actionTypes.UPDATE_SURVEY_NAME_DATE:
            console.log("UPDATE_SURVEY_NAME_DATE  survey reducer", action.data);
            //state = action.data;
            let new_end_date = action.data.end_date?action.data.end_date:state.end_date;
            return Object.assign({},state,{
                    survey_name:action.data.survey_name,
                    end_date:new_end_date
                }
            );

        case actionTypes.CHANGE_SURVEY_PUBLISH_STATE:
            console.log("UPDATE_SURVEY_NAME_DATE  survey reducer");
            let currentstate = state.ispublished;
            return Object.assign({},state,{
                ispublished:!currentstate
            });
        case actionTypes.CLOSE_SURVEY:
            console.log("[SurveyReducer] CLOSE_SURVEY: data: ",action.data);
            let new_end_1date = action.data.end_date?action.data.end_date:state.end_date;
            return Object.assign({},state, {
                end_date: new_end_1date
            });
        case actionTypes.SAVE_END_DATE:
            console.log("[SurveyReducer] SAVE_END_DATE: data: ",action.data);
            let new_end_date1 = action.data.end_date?action.data.end_date:state.end_date;
            return Object.assign({},state, {
                end_date: new_end_date1
            });
        case actionTypes.DELETE_QUESTION:
            console.log("[SurveyReducer] DELETE_QUESTION: data: ",action.data);
            let questions1;
            if(action.data && action.data.index_id){
                // questions1.splice(action.data.index_id, 1);
                questions1 = [
                    ...state.questions.slice(0, action.data.index_id),
                    ...state.questions.slice(action.data.index_id + 1)
                ];
            }
            console.log("[SurveyReducer] DELETE_QUESTION: questions1: ",questions1);
            return Object.assign({},state, {
                ...state,
                questions: questions1
            });
        case actionTypes.DELETE_OPTION:
            console.log("[SurveyReducer] DELETE_OPTION: data: ",action.data);
            let questions2 = [...state.questions];
            if(action.data && action.data.option_index!==undefined && action.data.question_index!==undefined){
                questions2[action.data.question_index].options = [
                    ...questions2[action.data.question_index].options.slice(0, action.data.option_index),
                    ...questions2[action.data.question_index].options.slice(action.data.option_index + 1)
                ];
            }
            console.log("[SurveyReducer] DELETE_OPTION: questions2: ",questions2);
            return Object.assign({},state, {
                questions: questions2
            });
        case actionTypes.EMPTY_SURVEY:
            return Object.assign({},state,{
                survey_id:"",
                survey_name: "",
                survey_type:"",
                end_date:"",
                questions:[],
                ispublished:true,
                iseditable:true
            });
        default :
            return state;
    }
};

export default survey;
