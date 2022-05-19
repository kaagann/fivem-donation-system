import React from 'react'
import { useLocation } from 'react-router';
import {RulesTexts} from '../../utils/Config';

function Rules() {
    const query =  new URLSearchParams(useLocation().search);

    const getRules = () => {
        let title = "";
        let description = "";
        switch (query.get("type")) {
            case "gizlilik":
                title = RulesTexts.GIZLILIK.title;
                description = RulesTexts.GIZLILIK.description;
                break;
            case "hizmet":
                title = RulesTexts.HIZMET_KULLANIM.title;
                description = RulesTexts.HIZMET_KULLANIM.description
                break;
            case "iade":
                title = RulesTexts.HIZMET_KULLANIM.title;
                description = RulesTexts.IADE.description
                break;
        }
        return {title, description}
    }
     
    return (
        <div className="h-full bg-gray-200 flex justify-center items-center p-1 text-black">
            <div className="bg-white p-2 w-3/6 h-3/6 shadow-md">
                <div className="text-center font-semibold text-lg border-b border-gray-200">
                    {getRules().title}
                </div>
                <div className="p-1">
                    {getRules().description}
                </div>
            </div>
        </div>
    )
}

export default Rules
