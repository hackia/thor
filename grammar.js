module.exports = grammar({
  name: 'maat',
  conflicts: $ => [
    [$.verb_statement]
  ],
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

   // Une instruction complète (maintenant l'opérande est totalement optionnel !)
    verb_statement: $ => seq(
      $.verb,
      optional(
        seq($.operand, optional(seq(',', $.operand)))
      )
    ),

    // Le Grand Dictionnaire de Thot (J'ai ajouté tous tes verbes !)
    verb: $ => choice(
      'ankh', 'dema', 'dja', 'duat', 'henek', 'henet', 'her', 'her_ankh', 
      'in', 'isfet', 'jena', 'kheb', 'kheper', 'kher', 'kher_ankh', 'kherp', 
      'mer', 'nama', 'neheh', 'out', 'per', 'pop', 'push', 'rdtsc', 'ret', 
      'sedjem', 'sema', 'sena', 'shesa', 'smen', 'sokh', 'wab', 'wdj'
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

