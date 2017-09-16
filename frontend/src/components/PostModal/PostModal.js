import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import { postPost } from '../../actions/posts';

class PostModal extends Component {
  state = {
    author: '',
    title: '',
    category: '',
    body: '',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ category: nextProps.categories[0].name });
  }

  handleFormControlChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { isOpen, onClose, actions, categories } = this.props;
    const { author, title, category, body } = this.state;

    return (
      <Modal show={isOpen} onHide={onClose} restoreFocus={false}>
        <form
          onSubmit={event => {
            event.preventDefault();
            actions.postPost(this.state);
            onClose();
          }}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Author</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter post author's name"
                name="author"
                value={author}
                onChange={this.handleFormControlChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter post's title"
                name="title"
                value={title}
                onChange={this.handleFormControlChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Category</ControlLabel>
              <FormControl
                componentClass="select"
                name="category"
                value={category}
                onChange={this.handleFormControlChange}>
                {categories.map(item => (
                  <option value={item.name} key={item.name}>
                    {item.name}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Body</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Enter post's body"
                name="body"
                value={body}
                onChange={this.handleFormControlChange}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
            <Button bsStyle="primary" type="submit">
              Add post
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ postPost }, dispatch),
  };
}

PostModal.propTypes = {
  isOpen: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.PropTypes.shape({
    postPost: PropTypes.func.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

PostModal.defaultProps = {
  isOpen: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);