import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './WizdomServiceTestWebPart.module.scss';
import * as strings from 'WizdomServiceTestWebPartStrings';

import { WizdomSpfxServices } from "@wizdom/services";

export interface IWizdomServiceTestWebPartProps {
  description: string;
}

export default class WizdomServiceTestWebPart extends BaseClientSideWebPart<IWizdomServiceTestWebPartProps> {

  public async render(): Promise<void> {

    // Initialization
    var wizdomServices = new WizdomSpfxServices(this.context);
    await wizdomServices.InitAsync({});

    // Usage
    var wizdomConfiguration = wizdomServices.WizdomConfiguration;
    var wizdomContext = wizdomServices.WizdomContext
    var wizdomTranslationService = wizdomServices.TranslationService;    
    
    wizdomServices.WizdomWebApiService.Get("api/wizdom/365/principals/me").then(result => {        
        alert("Me: " + JSON.stringify(result));
    });

    var createdByText = wizdomTranslationService.translate("Created by") + " Wizdom";

    this.domElement.innerHTML = `
      <div class="${ styles.wizdomServiceTest }" style="height:500px; overflow:hidden;">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Wizdom service no framework sample!</span>
              <p class="${ styles.description }">
                <b>Wizdom Translation</b><br/>
                ${createdByText}                
              </p>     
              <p class="${ styles.description }">
                <b>Wizdom Context</b><br/>
                ${JSON.stringify(wizdomContext)}
              </p>
              <p class="${ styles.description }">
                <b>Wizdom Configuration</b><br/>                
                ${JSON.stringify(wizdomConfiguration)}                
              </p>              
            </div>
          </div>
        </div>
      </div>`;      
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}