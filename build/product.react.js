/**
 * Created by idams on 6/16/15.
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var ProductCategoryRow = (function (_React$Component) {
    function ProductCategoryRow(props) {
        _classCallCheck(this, ProductCategoryRow);

        _get(Object.getPrototypeOf(ProductCategoryRow.prototype), 'constructor', this).call(this, props);
    }

    _inherits(ProductCategoryRow, _React$Component);

    _createClass(ProductCategoryRow, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    { colSpan: '2' },
                    this.props.category
                )
            );
        }
    }]);

    return ProductCategoryRow;
})(React.Component);

ProductCategoryRow.propTypes = { category: React.PropTypes.string };
ProductCategoryRow.defaultProps = { category: null };

var ProductRow = (function (_React$Component2) {
    function ProductRow(props) {
        _classCallCheck(this, ProductRow);

        _get(Object.getPrototypeOf(ProductRow.prototype), 'constructor', this).call(this, props);
        console.log('test');
    }

    _inherits(ProductRow, _React$Component2);

    _createClass(ProductRow, [{
        key: 'render',
        value: function render() {
            var name = this.props.product.stocked ? this.props.product.name : React.createElement(
                'span',
                { style: { color: 'red' } },
                this.props.product.name
            );
            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    { colSpan: '1' },
                    name
                ),
                React.createElement(
                    'td',
                    { colSpan: '1' },
                    this.props.product.price
                )
            );
        }
    }]);

    return ProductRow;
})(React.Component);

ProductRow.propTypes = { product: React.PropTypes.object };
ProductRow.defaultProps = { product: {} };

var ProductTable = (function (_React$Component3) {
    function ProductTable(props) {
        _classCallCheck(this, ProductTable);

        _get(Object.getPrototypeOf(ProductTable.prototype), 'constructor', this).call(this, props);
    }

    _inherits(ProductTable, _React$Component3);

    _createClass(ProductTable, [{
        key: '_filterProduct',
        value: function _filterProduct(product, regex) {
            if (this.props.inStockOnly && !product.stocked) return false;

            if (regex) return product.name.search(regex) > -1;

            return true;
        }
    }, {
        key: 'render',
        value: function render() {
            var rows = [];
            var lastCategory = null;
            var regex = this.props.filterText ? new RegExp(this.props.filterText, 'i') : null;

            this.props.products.forEach((function (product) {
                if (this._filterProduct(product, regex)) {
                    if (lastCategory !== product.category) {
                        rows.push(React.createElement(ProductCategoryRow, { category: product.category }));
                    }
                    rows.push(React.createElement(ProductRow, { product: product }));
                    lastCategory = product.category;
                }
            }).bind(this));

            return React.createElement(
                'table',
                null,
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            'Name'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Price'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    rows
                )
            );
        }
    }]);

    return ProductTable;
})(React.Component);

ProductTable.propTypes = {
    products: React.PropTypes.array,
    filterText: React.PropTypes.string,
    inStockOnly: React.PropTypes.bool
};
ProductTable.defaultProps = {
    products: [],
    filterText: null,
    inStockOnly: false
};

var SearchBar = (function (_React$Component4) {
    function SearchBar(props) {
        _classCallCheck(this, SearchBar);

        _get(Object.getPrototypeOf(SearchBar.prototype), 'constructor', this).call(this, props);

        this._handleChange = this._handleChange.bind(this);
    }

    _inherits(SearchBar, _React$Component4);

    _createClass(SearchBar, [{
        key: '_handleChange',
        value: function _handleChange() {
            this.props.onChange(this);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                null,
                React.createElement('input', { type: 'text', placeholder: 'Search...', value: this.props.filterText, onChange: this._handleChange, ref: 'text' }),
                React.createElement(
                    'label',
                    null,
                    React.createElement('input', { type: 'checkbox', checked: this.props.inStockOnly, onChange: this._handleChange, ref: 'stock' }),
                    'show products in stock'
                )
            );
        }
    }]);

    return SearchBar;
})(React.Component);

SearchBar.propTypes = {
    filterText: React.PropTypes.string,
    inStockOnly: React.PropTypes.bool,
    onChange: React.PropTypes.func
};
SearchBar.defaultProps = {
    filterText: null,
    inStockOnly: false,
    onChange: null
};

var FilterableProductTable = (function (_React$Component5) {
    function FilterableProductTable(props) {
        _classCallCheck(this, FilterableProductTable);

        _get(Object.getPrototypeOf(FilterableProductTable.prototype), 'constructor', this).call(this, props);

        this.state = { filterText: null, inStockOnly: false };
        this._handleChange = this._handleChange.bind(this);
    }

    _inherits(FilterableProductTable, _React$Component5);

    _createClass(FilterableProductTable, [{
        key: '_handleChange',
        value: function _handleChange(child) {
            var text = React.findDOMNode(child.refs.text).value.trim();
            var checked = React.findDOMNode(child.refs.stock).checked;

            this.setState({ filterText: text, inStockOnly: checked });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { classNam: 'productTable' },
                React.createElement(SearchBar, {
                    filterText: this.state.filterText,
                    inStockOnly: this.state.inStockOnly,
                    onChange: this._handleChange
                }),
                React.createElement(ProductTable, {
                    products: this.props.products,
                    filterText: this.state.filterText,
                    inStockOnly: this.state.inStockOnly
                })
            );
        }
    }]);

    return FilterableProductTable;
})(React.Component);

FilterableProductTable.propTypes = {
    products: React.PropTypes.array
};
FilterableProductTable.defaultProps = {
    products: []
};

var PRODUCTS = [{ category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' }, { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' }, { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' }, { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' }, { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' }, { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }];

React.render(React.createElement(FilterableProductTable, { products: PRODUCTS }), document.body);
//# sourceMappingURL=product.react.js.map
