module.exports = grammar({
  name: 'maat',

  rules: {
    // Le point d'entrée : un fichier est une suite d'instructions
    source_file: $ => repeat($._instruction),

    _instruction: $ => choice(
      $.comment,
      $.verb_statement,
      $.label
    ),

    // Le murmure : tout ce qui suit un point-virgule
    comment: $ => token(seq(';', /.*/)),

    // Une étiquette (ex: DEBUT_BOUCLE:)
    label: $ => seq($.identifier, ':'),

    // Une instruction complète (ex: ankh %rcx, 0)
    verb_statement: $ => seq(
      $.verb,
      $.operand,
      optional(seq(',', $.operand))
    ),

    // Le dictionnaire des verbes de Thot
    verb: $ => choice(
      'ankh', 'henek', 'per', 'sema', 'wdj', 'sokh', 'returne', 'duat', 'isfet', 'maat'
    ),

    // Un opérande peut être un registre, un nombre, du texte, ou un nom (étiquette)
    operand: $ => choice(
      $.register,
      $.number,
      $.string,
      $.identifier
    ),

    // Un registre (Hélice) commence par % (ex: %ka, %rcx)
    register: $ => /%[a-zA-Z0-9_]+/,

    // Un nombre entier ou hexadécimal
    number: $ => /(0x[0-9a-fA-F]+)|\d+/,

    // Une chaîne de caractères entre guillemets
    string: $ => /"[^"]*"/,

    // Un identifiant classique (nom de fonction, label cible)
    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/
  }
});

