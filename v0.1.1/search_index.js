var documenterSearchIndex = {"docs":
[{"location":"api.html#API-Documentation-1","page":"API","title":"API Documentation","text":"","category":"section"},{"location":"api.html#","page":"API","title":"API","text":"Modules = [ChainRulesCore]","category":"page"},{"location":"api.html#ChainRulesCore.AbstractRule","page":"API","title":"ChainRulesCore.AbstractRule","text":"Subtypes of AbstractRule are types which represent the primitive derivative propagation \"rules\" that can be composed to implement forward- and reverse-mode automatic differentiation.\n\nMore specifically, a rule::AbstractRule is a callable Julia object generally obtained via calling frule or rrule. Such rules accept differential values as input, evaluate the chain rule using internally stored/ computed partial derivatives to produce a single differential value, then return that calculated differential value.\n\nFor example:\n\njulia> using ChainRulesCore: frule, rrule, AbstractRule\n\njulia> x, y = rand(2);\n\njulia> h, dh = frule(hypot, x, y);\n\njulia> h == hypot(x, y)\ntrue\n\njulia> isa(dh, AbstractRule)\ntrue\n\njulia> Δx, Δy = rand(2);\n\njulia> dh(Δx, Δy) == ((x / h) * Δx + (y / h) * Δy)\ntrue\n\njulia> h, (dx, dy) = rrule(hypot, x, y);\n\njulia> h == hypot(x, y)\ntrue\n\njulia> isa(dx, AbstractRule) && isa(dy, AbstractRule)\ntrue\n\njulia> Δh = rand();\n\njulia> dx(Δh) == (x / h) * Δh\ntrue\n\njulia> dy(Δh) == (y / h) * Δh\ntrue\n\nSee also: frule, rrule, Rule, DNERule, WirtingerRule\n\n\n\n\n\n","category":"type"},{"location":"api.html#ChainRulesCore.AbstractRule-Tuple{Type,AbstractRule,AbstractRule}","page":"API","title":"ChainRulesCore.AbstractRule","text":"AbstractRule(𝒟::Type, primal::AbstractRule, conjugate::AbstractRule)\n\nReturn a Rule evaluating to primal(Δ) + conjugate(Δ) if 𝒟 <: Real, otherwise return WirtingerRule(P, C).\n\n\n\n\n\n","category":"method"},{"location":"api.html#ChainRulesCore.Casted","page":"API","title":"ChainRulesCore.Casted","text":"Casted(v)\n\nThis differential wraps another differential (including a number-like type) to indicate that it should be lazily broadcast.\n\n\n\n\n\n","category":"type"},{"location":"api.html#ChainRulesCore.DNE","page":"API","title":"ChainRulesCore.DNE","text":"DNE()\n\nThis differential indicates that the derivative Does Not Exist (D.N.E). This is not the cast that it is not implemented, but rather that it mathematically is not defined.\n\n\n\n\n\n","category":"type"},{"location":"api.html#ChainRulesCore.DNERule","page":"API","title":"ChainRulesCore.DNERule","text":"DNERule(args...)\n\nConstruct a DNERule object, which is an AbstractRule that signifies that the current function is not differentiable with respect to a particular parameter. DNE is an abbreviation for Does Not Exist.\n\n\n\n\n\n","category":"type"},{"location":"api.html#ChainRulesCore.One","page":"API","title":"ChainRulesCore.One","text":" One()\n\nThe Differential which is the multiplicative identity. Basically, this represents 1.\n\n\n\n\n\n","category":"type"},{"location":"api.html#ChainRulesCore.Rule","page":"API","title":"ChainRulesCore.Rule","text":"Rule(propation_function[, updating_function])\n\nReturn a Rule that wraps the given propation_function. It is assumed that propation_function is a callable object whose arguments are differential values, and whose output is a single differential value calculated by applying internally stored/computed partial derivatives to the input differential values.\n\nIf an updating function is provided, it is assumed to have the signature u(Δ, xs...) and to store the result of the propagation function applied to the arguments xs into Δ in-place, returning Δ.\n\nFor example:\n\nfrule(::typeof(*), x, y) = x * y, Rule((Δx, Δy) -> Δx * y + x * Δy)\n\nrrule(::typeof(*), x, y) = x * y, (Rule(ΔΩ -> ΔΩ * y'), Rule(ΔΩ -> x' * ΔΩ))\n\nSee also: frule, rrule, accumulate, accumulate!, store!\n\n\n\n\n\n","category":"type"},{"location":"api.html#ChainRulesCore.Thunk","page":"API","title":"ChainRulesCore.Thunk","text":"Thunk(()->v)\n\nA thunk is a deferred computation. It wraps a zero argument closure that when invoked returns a differential.\n\n\n\n\n\n","category":"type"},{"location":"api.html#ChainRulesCore.Wirtinger","page":"API","title":"ChainRulesCore.Wirtinger","text":"Wirtinger(primal::Union{Number,AbstractDifferential},\n          conjugate::Union{Number,AbstractDifferential})\n\nReturns a Wirtinger instance representing the complex differential:\n\ndf = ∂f/∂z * dz + ∂f/∂z̄ * dz̄\n\nwhere primal corresponds to ∂f/∂z * dz and conjugate corresponds to ∂f/∂z̄ * dz̄.\n\nThe two fields of the returned instance can be accessed generically via the wirtinger_primal and wirtinger_conjugate methods.\n\n\n\n\n\n","category":"type"},{"location":"api.html#ChainRulesCore.Zero","page":"API","title":"ChainRulesCore.Zero","text":"Zero()\n\nThe additive identity for differentials. This is basically the same as 0.\n\n\n\n\n\n","category":"type"},{"location":"api.html#ChainRulesCore.extern-Tuple{Any}","page":"API","title":"ChainRulesCore.extern","text":"extern(x)\n\nReturn x converted to an appropriate non-AbstractDifferential type, for use with external packages that might not handle AbstractDifferential types.\n\nNote that this function may return an alias (not necessarily a copy) to data wrapped by x, such that mutating extern(x) might mutate x itself.\n\n\n\n\n\n","category":"method"},{"location":"api.html#ChainRulesCore.frule-Tuple{Any,Vararg{Any,N} where N}","page":"API","title":"ChainRulesCore.frule","text":"frule(f, x...)\n\nExpressing x as the tuple (x₁, x₂, ...) and the output tuple of f(x...) as Ω, return the tuple:\n\n(Ω, (rule_for_ΔΩ₁::AbstractRule, rule_for_ΔΩ₂::AbstractRule, ...))\n\nwhere each returned propagation rule rule_for_ΔΩᵢ can be invoked as\n\nrule_for_ΔΩᵢ(Δx₁, Δx₂, ...)\n\nto yield Ωᵢ's corresponding differential ΔΩᵢ. To illustrate, if all involved values are real-valued scalars, this differential can be written as:\n\nΔΩᵢ = ∂Ωᵢ_∂x₁ * Δx₁ + ∂Ωᵢ_∂x₂ * Δx₂ + ...\n\nIf no method matching frule(f, xs...) has been defined, then return nothing.\n\nExamples:\n\nunary input, unary output scalar function:\n\njulia> x = rand();\n\njulia> sinx, dsin = frule(sin, x);\n\njulia> sinx == sin(x)\ntrue\n\njulia> dsin(1) == cos(x)\ntrue\n\nunary input, binary output scalar function:\n\njulia> x = rand();\n\njulia> sincosx, (dsin, dcos) = frule(sincos, x);\n\njulia> sincosx == sincos(x)\ntrue\n\njulia> dsin(1) == cos(x)\ntrue\n\njulia> dcos(1) == -sin(x)\ntrue\n\nSee also: rrule, AbstractRule, @scalar_rule\n\n\n\n\n\n","category":"method"},{"location":"api.html#ChainRulesCore.rrule-Tuple{Any,Vararg{Any,N} where N}","page":"API","title":"ChainRulesCore.rrule","text":"rrule(f, x...)\n\nExpressing x as the tuple (x₁, x₂, ...) and the output tuple of f(x...) as Ω, return the tuple:\n\n(Ω, (rule_for_Δx₁::AbstractRule, rule_for_Δx₂::AbstractRule, ...))\n\nwhere each returned propagation rule rule_for_Δxᵢ can be invoked as\n\nrule_for_Δxᵢ(ΔΩ₁, ΔΩ₂, ...)\n\nto yield xᵢ's corresponding differential Δxᵢ. To illustrate, if all involved values are real-valued scalars, this differential can be written as:\n\nΔxᵢ = ∂Ω₁_∂xᵢ * ΔΩ₁ + ∂Ω₂_∂xᵢ * ΔΩ₂ + ...\n\nIf no method matching rrule(f, xs...) has been defined, then return nothing.\n\nExamples:\n\nunary input, unary output scalar function:\n\njulia> x = rand();\n\njulia> sinx, dx = rrule(sin, x);\n\njulia> sinx == sin(x)\ntrue\n\njulia> dx(1) == cos(x)\ntrue\n\nbinary input, unary output scalar function:\n\njulia> x, y = rand(2);\n\njulia> hypotxy, (dx, dy) = rrule(hypot, x, y);\n\njulia> hypotxy == hypot(x, y)\ntrue\n\njulia> dx(1) == (x / hypot(x, y))\ntrue\n\njulia> dy(1) == (y / hypot(x, y))\ntrue\n\nSee also: frule, AbstractRule, @scalar_rule\n\n\n\n\n\n","category":"method"},{"location":"api.html#ChainRulesCore.store!-Tuple{Any,AbstractRule,Vararg{Any,N} where N}","page":"API","title":"ChainRulesCore.store!","text":"store!(Δ, rule::AbstractRule, args...)\n\nCompute rule(args...) and store the result in Δ, potentially avoiding intermediate temporary allocations that might be necessary for alternative approaches (e.g. copyto!(Δ, extern(rule(args...))))\n\nNote that this function internally calls Base.Broadcast.materialize!(Δ, ...).\n\nLike accumulate and accumulate!, this function is intended to be customizable for specific rules/input types.\n\nSee also: accumulate, accumulate!, AbstractRule\n\n\n\n\n\n","category":"method"},{"location":"api.html#ChainRulesCore.@scalar_rule-Tuple{Any,Any,Vararg{Any,N} where N}","page":"API","title":"ChainRulesCore.@scalar_rule","text":"@scalar_rule(f(x₁, x₂, ...),\n             @setup(statement₁, statement₂, ...),\n             (∂f₁_∂x₁, ∂f₁_∂x₂, ...),\n             (∂f₂_∂x₁, ∂f₂_∂x₂, ...),\n             ...)\n\nA convenience macro that generates simple scalar forward or reverse rules using the provided partial derivatives. Specifically, generates the corresponding methods for frule and rrule:\n\nfunction ChainRulesCore.frule(::typeof(f), x₁::Number, x₂::Number, ...)\n    Ω = f(x₁, x₂, ...)\n    $(statement₁, statement₂, ...)\n    return Ω, (Rule((Δx₁, Δx₂, ...) -> ∂f₁_∂x₁ * Δx₁ + ∂f₁_∂x₂ * Δx₂ + ...),\n               Rule((Δx₁, Δx₂, ...) -> ∂f₂_∂x₁ * Δx₁ + ∂f₂_∂x₂ * Δx₂ + ...),\n               ...)\nend\n\nfunction ChainRulesCore.rrule(::typeof(f), x₁::Number, x₂::Number, ...)\n    Ω = f(x₁, x₂, ...)\n    $(statement₁, statement₂, ...)\n    return Ω, (Rule((ΔΩ₁, ΔΩ₂, ...) -> ∂f₁_∂x₁ * ΔΩ₁ + ∂f₂_∂x₁ * ΔΩ₂ + ...),\n               Rule((ΔΩ₁, ΔΩ₂, ...) -> ∂f₁_∂x₂ * ΔΩ₁ + ∂f₂_∂x₂ * ΔΩ₂ + ...),\n               ...)\nend\n\nIf no type constraints in f(x₁, x₂, ...) within the call to @scalar_rule are provided, each parameter in the resulting frule/rrule definition is given a type constraint of Number. Constraints may also be explicitly be provided to override the Number constraint, e.g. f(x₁::Complex, x₂), which will constrain x₁ to Complex and x₂ to Number.\n\nNote that the result of f(x₁, x₂, ...) is automatically bound to Ω. This allows the primal result to be conveniently referenced (as Ω) within the derivative/setup expressions.\n\nNote that the @setup argument can be elided if no setup code is need. In other words:\n\n@scalar_rule(f(x₁, x₂, ...),\n             (∂f₁_∂x₁, ∂f₁_∂x₂, ...),\n             (∂f₂_∂x₁, ∂f₂_∂x₂, ...),\n             ...)\n\nis equivalent to:\n\n@scalar_rule(f(x₁, x₂, ...),\n             @setup(nothing),\n             (∂f₁_∂x₁, ∂f₁_∂x₂, ...),\n             (∂f₂_∂x₁, ∂f₂_∂x₂, ...),\n             ...)\n\nFor examples, see ChainRulesCore' rules directory.\n\nSee also: frule, rrule, AbstractRule\n\n\n\n\n\n","category":"macro"},{"location":"api.html#ChainRulesCore.AbstractDifferential","page":"API","title":"ChainRulesCore.AbstractDifferential","text":"The subtypes of AbstractDifferential define a custom \"algebra\" for chain rule evaluation that attempts to factor various features like complex derivative support, broadcast fusion, zero-elision, etc. into nicely separated parts.\n\nAll subtypes of AbstractDifferential implement the following operations:\n\n+(a, b): linearly combine differential a and differential b\n\n*(a, b): multiply the differential a by the differential b\n\nBase.conj(x): complex conjugate of the differential x\n\nextern(x): convert x into an appropriate non-AbstractDifferential type for use outside of ChainContext.\n\nValid arguments to these operations are T where T<:AbstractDifferential, or where T has proper + and * implementations.\n\nAdditionally, all subtypes of AbstractDifferential support Base.iterate and Base.Broadcast.broadcastable(x).\n\n\n\n\n\n","category":"type"},{"location":"api.html#ChainRulesCore.WirtingerRule","page":"API","title":"ChainRulesCore.WirtingerRule","text":"WirtingerRule(primal::AbstractRule, conjugate::AbstractRule)\n\nConstruct a WirtingerRule object, which is an AbstractRule that consists of an AbstractRule for both the primal derivative x and the conjugate derivative x. If the domain 𝒟 of the function might be real, consider calling AbstractRule(𝒟, primal, conjugate) instead, to make use of a more efficient representation wherever possible.\n\n\n\n\n\n","category":"type"},{"location":"api.html#ChainRulesCore.accumulate!-Tuple{Any,AbstractRule,Vararg{Any,N} where N}","page":"API","title":"ChainRulesCore.accumulate!","text":"accumulate!(Δ, rule::AbstractRule, args...)\n\nSimilar to accumulate, but compute Δ + rule(args...) in-place, storing the result in Δ.\n\nNote that this function internally calls Base.Broadcast.materialize!(Δ, ...).\n\nSee also: accumulate, store!, AbstractRule\n\n\n\n\n\n","category":"method"},{"location":"api.html#ChainRulesCore.accumulate-Tuple{Any,AbstractRule,Vararg{Any,N} where N}","page":"API","title":"ChainRulesCore.accumulate","text":"accumulate(Δ, rule::AbstractRule, args...)\n\nReturn Δ + rule(args...) evaluated in a manner that supports ChainRulesCore' various AbstractDifferential types.\n\nThis method intended to be customizable for specific rules/input types. For example, here is pseudocode to overload accumulate w.r.t. a specific forward differentiation rule for a given function f:\n\ndf(x) = # forward differentiation primitive implementation\n\nfrule(::typeof(f), x) = (f(x), Rule(df))\n\naccumulate(Δ, rule::Rule{typeof(df)}, x) = # customized `accumulate` implementation\n\nSee also: accumulate!, store!, AbstractRule\n\n\n\n\n\n","category":"method"},{"location":"getting_started.html#Getting-Started-1","page":"Getting Started","title":"Getting Started","text":"","category":"section"},{"location":"getting_started.html#","page":"Getting Started","title":"Getting Started","text":"ChainRulesCore.jl is a light-weight dependency for defining sensitivities for functions in your packages, without you needing to depend on ChainRules itself. It has no dependencies of its own.","category":"page"},{"location":"getting_started.html#","page":"Getting Started","title":"Getting Started","text":"ChainRules.jl provides the full functionality, including sensitivities for Base Julia and standard libraries. Sensitivities for some other packages, currently SpecialFunctions.jl and NaNMath.jl, will also be loaded if those packages are in your environment. In general, we recommend adding custom sensitivities to your own packages with ChainRulesCore, rather than adding them to ChainRules.jl.","category":"page"},{"location":"getting_started.html#Defining-Custom-Sensitivities-1","page":"Getting Started","title":"Defining Custom Sensitivities","text":"","category":"section"},{"location":"getting_started.html#","page":"Getting Started","title":"Getting Started","text":"TODO","category":"page"},{"location":"getting_started.html#Forward-Mode-vs.-Reverse-Mode-Chain-Rule-Evaluation-1","page":"Getting Started","title":"Forward-Mode vs. Reverse-Mode Chain Rule Evaluation","text":"","category":"section"},{"location":"getting_started.html#","page":"Getting Started","title":"Getting Started","text":"TODO","category":"page"},{"location":"getting_started.html#Real-Scalar-Differentiation-Rules-1","page":"Getting Started","title":"Real Scalar Differentiation Rules","text":"","category":"section"},{"location":"getting_started.html#","page":"Getting Started","title":"Getting Started","text":"TODO","category":"page"},{"location":"getting_started.html#Complex-Scalar-Differentiation-Rules-1","page":"Getting Started","title":"Complex Scalar Differentiation Rules","text":"","category":"section"},{"location":"getting_started.html#","page":"Getting Started","title":"Getting Started","text":"TODO","category":"page"},{"location":"getting_started.html#Non-Scalar-Differentiation-Rules-1","page":"Getting Started","title":"Non-Scalar Differentiation Rules","text":"","category":"section"},{"location":"getting_started.html#","page":"Getting Started","title":"Getting Started","text":"TODO","category":"page"},{"location":"index.html#","page":"Introduction","title":"Introduction","text":"DocTestSetup = :(using ChainRulesCore, ChainRules)","category":"page"},{"location":"index.html#ChainRules-1","page":"Introduction","title":"ChainRules","text":"","category":"section"},{"location":"index.html#","page":"Introduction","title":"Introduction","text":"ChainRules.jl provides a variety of common utilities that can be used by downstream automatic differentiation (AD) tools to define and execute forward-, reverse-, and mixed-mode primitives.","category":"page"},{"location":"index.html#","page":"Introduction","title":"Introduction","text":"This package is a work-in-progress, as is the documentation. Contributions welcome!","category":"page"}]
}