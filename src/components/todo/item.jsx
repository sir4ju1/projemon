import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import linkState from 'linkstate';
import cx from 'classnames'
const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

import * as actions from '../../actions';
import reducers from '../../reducers';

@connect(reducers, actions)
export default class TodoItem extends Component {
	handleSubmit = () => {
		console.log(this.props)

		val = this.state.editText.trim();
		if (val) {
			this.setState({ editText: val });
		}
		else {
		}
	};

	handleEdit = () => {
		let { onEdit, todo } = this.props;
		onEdit(todo);
		this.setState({ editText: todo.title });
	};

	toggle = e => {
		let { onToggle, todo } = this.props;
		onToggle(todo);
		e.preventDefault();
	};

	handleKeyDown = e => {
		if (e.which === ESCAPE_KEY) {
			let { todo } = this.props;
			this.setState({ editText: todo.title });
			this.props.onCancel(todo);
		}
		else if (e.which === ENTER_KEY) {
			this.handleSubmit();
		}
	};

	handleDestroy = () => {
		this.props.onDestroy(this.props.todo);
	};

	// shouldComponentUpdate({ todo, editing, editText }) {
	// 	return (
	// 		todo !== this.props.todo ||
	// 		editing !== this.props.editing ||
	// 		editText !== this.state.editText
	// 	);
	// }

	componentDidUpdate() {
		let node = this.base && this.base.querySelector('.edit');
		if (node) node.focus();
	}

	render({ todo: { title, completed }, onToggle, onDestroy, editing, selectTodo }, { editText }) {
		return (
			<li class={cx({ completed, editing })} onClick={() => selectTodo({ title, completed })}>
				<div class="view">
					<input
						class="toggle"
						type="checkbox"
						checked={completed}
						onChange={this.toggle}
					/>
					<label onDblClick={this.handleEdit}>{title}</label>
					<a href="javascript:" class="destroy" onClick={this.handleDestroy} />
				</div>
				{editing && (
					<input
						class="edit"
						value={editText}
						onBlur={this.handleSubmit}
						onInput={linkState(this, 'editText')}
						onKeyDown={this.handleKeyDown}
					/>
				)}
			</li>
		);
	}
}