import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpfxCrudPocWebPartStrings';
import SpfxCrudPoc from './components/SpfxCrudPoc';
import { ISpfxCrudPocProps } from './components/ISpfxCrudPocProps';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
export interface ISpfxCrudPocWebPartProps {
  description: string;

}

export default class SpfxCrudPocWebPart extends BaseClientSideWebPart <ISpfxCrudPocWebPartProps> {
// ...

public onInit(): Promise<void> {

  return super.onInit().then(_ => {

    // other init code may be present

    sp.setup({
      spfxContext: this.context
    });
  });
}

  public render(): void {
    const element: React.ReactElement<ISpfxCrudPocProps> = React.createElement(
      SpfxCrudPoc,
      {
        description: this.properties.description
        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getdataVersion(): Version {
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
