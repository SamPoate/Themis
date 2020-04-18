// import React, { FunctionComponent, useState } from 'react';
import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import {
    Container,
    Grid,
    Table,
    Label,
    List,
    Segment,
    Responsive,
    Menu,
    Header,
    Button
} from 'semantic-ui-react';

import { getRounds } from '../api/api';

export interface AppProps {
    compiler: string;
    framework: string;
}

export const App: FunctionComponent<AppProps> = () => {
    const [fixed, setFixed] = useState(false);
    const [apiCalled, setApiCalled] = useState(false);
    const [users, setUsers] = useState([]);

    const hideFixedMenu = () => setFixed(false);
    const showFixedMenu = () => setFixed(true);

    const callApi = async () => {
        const response = await getRounds();

        setApiCalled(true);
        setUsers(response.data.map((banana: { name: any }) => banana.name));
    };

    return (
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Segment
                inverted
                textAlign="center"
                style={{ padding: '1em 0em' }}
                vertical
            >
                <Container>
                    <Menu inverted pointing secondary size="large">
                        <Menu.Item as="a" active>
                            Home
                        </Menu.Item>
                        <Menu.Item as="a">Teams</Menu.Item>
                        <Menu.Item position="right">
                            <Button as="a" inverted={!fixed}>
                                Log in
                            </Button>
                            <Button
                                as="a"
                                inverted={!fixed}
                                primary={fixed}
                                style={{ marginLeft: '0.5em' }}
                            >
                                Sign Up
                            </Button>
                        </Menu.Item>
                    </Menu>
                    <Header
                        as="h1"
                        inverted
                        style={{
                            fontSize: '4em',
                            fontWeight: 'bold',
                            margin: '1em 0'
                        }}
                    >
                        Who's round is it anyway?
                    </Header>
                </Container>
            </Segment>
            <Container text textAlign="left" style={{ margin: '1em 0' }}>
                <Header as="h2">The Squad</Header>
                {apiCalled ? (
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    Their round?
                                </Table.HeaderCell>
                                <Table.HeaderCell>Who</Table.HeaderCell>
                                <Table.HeaderCell>How many</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {users.map(user => (
                                <Table.Row key={user}>
                                    <Table.Cell>
                                        <Label ribbon>Yes</Label>
                                    </Table.Cell>
                                    <Table.Cell>{user}</Table.Cell>
                                    <Table.Cell>{user}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan="3">
                                    <Button onClick={() => setApiCalled(false)}>
                                        Reset
                                    </Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                ) : (
                    <Button onClick={callApi}>Get Rounds</Button>
                )}
            </Container>
            <Segment
                inverted
                vertical
                style={{
                    padding: '5em 0em',
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    width: '100vw'
                }}
            >
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Header inverted as="h4" content="About" />
                                <List link inverted>
                                    <List.Item as="a">Contact Us</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Header as="h4" inverted>
                                    Footer
                                </Header>
                                <p>Down your pints now!</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </Responsive>
    );
};
