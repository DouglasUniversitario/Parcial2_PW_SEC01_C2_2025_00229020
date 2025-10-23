const path = require('path');
const fs = require('fs');
const rutaDatos = path.join(__dirname, '..', 'datos', 'cuentas.json');

function cargarDatos() {
    const datosCrudos = fs.readFileSync(rutaDatos, 'utf8');
    return JSON.parse(datosCrudos);
}

exports.obtenerTodas = (req, res) => {
    const { queryParam } = req.query;
    const cuentas = cargarDatos();

    if (queryParam !== undefined) {
        const texto = String(queryParam).toLowerCase();

        const porId = cuentas.filter(c => String(c.id).toLowerCase() === texto);
        if (porId.length === 1) return res.json({ encontrado: true, cuenta: porId[0] });
        if (porId.length > 1) return res.json({ encontrado: true, datos: porId });

        const porNombre = cuentas.filter(c => c.name.toLowerCase().includes(texto));
        if (porNombre.length === 1) return res.json({ encontrado: true, cuenta: porNombre[0] });
        if (porNombre.length > 1) return res.json({ encontrado: true, datos: porNombre });

        const porGenero = cuentas.filter(c => String(c.gender).toLowerCase() === texto);
        if (porGenero.length === 1) return res.json({ encontrado: true, cuenta: porGenero[0] });
        if (porGenero.length > 1) return res.json({ encontrado: true, datos: porGenero });

        return res.json({ encontrado: false, mensaje: 'No se encontro esa cvuenta.' });
    }

    res.json({ cantidad: cuentas.length, datos: cuentas });
};

exports.obtenerPorId = (req, res) => {
    const { id } = req.params;
    const cuentas = cargarDatos();
    const cuentaEncontrada = cuentas.find(c => String(c.id) === String(id));

    if (cuentaEncontrada) {
        res.json({ encontrado: true, cuenta: cuentaEncontrada });
    } else {
        res.json({ encontrado: false, cuenta: null });
    }
};

exports.obtenerBalance = (req, res) => {
    const cuentas = cargarDatos();
    const cuentasActivas = cuentas.filter(c => c.isActive === true);

    if (cuentasActivas.length === 0) {
        return res.json({ estado: false, balanceTotal: 0 });
    }

    const suma = cuentasActivas.reduce((acum, actual) => acum + Number(actual.balance || 0), 0);

    res.json({ estado: true, balanceTotal: Number(suma.toFixed(2)) });
};
