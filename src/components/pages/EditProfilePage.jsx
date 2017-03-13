import React, { Component } from 'react';

import { page, card, heading } from './EditProfilePage.scss';

import Page from '../basic/Page';
import Card from '../basic/Card';
import Heading from '../basic/Heading';

import EditProfileFormContainer from '../../containers/EditProfileFormContainer';

export default class EditProfilePage extends Component {
  render() {
    return (
      <Page className={page}>
        <Card className={card} >
          <Heading>Edit your account</Heading>
          <EditProfileFormContainer />
        </Card>
      </Page>
    );
  }
}