package learJava8;

// predicate



public class java8 {
    public static void main(String[] args) {

        //-------> Predicate Interface <----------
        // .test is the abstract method
        // negate or and are the default methods

        //eg
        // Predicate<Integer> pre = a -> a%2==0;
        // System.out.println(pre.test(20)); 
        // Boolean val = pre.negate().test(16);
        // if(val == true) System.out.println("Working"); 

        // -------> Functional Interface <------------
        //used to perform some operations 
        // .apply is the abstract method
        // compose andThen are default
        // identity is static

        //eg
        // Function<String,Integer> func = docs -> docs.length();
        // Function<String,String> work = valid -> valid.charAt(0) + "" + valid.charAt(valid.length()-1);
        // System.out.println(func.apply("Matrix"));
        // System.out.println(work.apply("How are you"));

        // Function<Integer, Integer> function1 = x -> 2*x;
        // Function<Integer, Integer> function2 = a -> a*a*a;

        // System.out.println(function1.andThen(function2).apply(10));
        // System.out.println(function2.andThen(function1).apply(10));

        // -------> Consumer Interface <------------
        // Its return type is void and another fucntional interface 
        // 

    }
}
